import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Plus, ShieldCheck, Trash2 } from 'lucide-react';
import BrandLogo from '../components/BrandLogo';

type RiskTolerance = 'conservative' | 'moderate' | 'aggressive';
type InvestmentHorizon = 'short_term' | 'medium_term' | 'long_term';
type EmploymentStatus = 'employed' | 'self_employed' | 'student' | 'retired';
type GoalPriority = 'low' | 'medium' | 'high';
type DebtType = 'credit_card' | 'student_loan' | 'mortgage' | 'other';

type Goal = {
  id: string;
  name: string;
  targetAmount: string;
  currentAmount: string;
  priority: GoalPriority;
};

type Debt = {
  id: string;
  name: string;
  balance: string;
  interestRate: string;
  minPayment: string;
  type: DebtType;
};

type FormState = {
  monthlyIncome: string;
  monthlyExpenses: string;
  age: string;
  employmentStatus: EmploymentStatus;
  riskTolerance: RiskTolerance;
  investmentHorizon: InvestmentHorizon;
  savingsGoals: Goal[];
  debts: Debt[];
};

const STORAGE_KEY = 'wealthpath-onboarding-profile';

const steps = ['Money In', 'Risk Profile', 'Goals', 'Debts'] as const;

const newGoal = (): Goal => ({
  id: crypto.randomUUID(),
  name: '',
  targetAmount: '',
  currentAmount: '',
  priority: 'high',
});

const newDebt = (): Debt => ({
  id: crypto.randomUUID(),
  name: '',
  balance: '',
  interestRate: '',
  minPayment: '',
  type: 'credit_card',
});

const initialState = (): FormState => ({
  monthlyIncome: '',
  monthlyExpenses: '',
  age: '',
  employmentStatus: 'employed',
  riskTolerance: 'moderate',
  investmentHorizon: 'long_term',
  savingsGoals: [newGoal()],
  debts: [newDebt()],
});

const riskCards: Array<{ value: RiskTolerance; title: string; body: string }> = [
  { value: 'conservative', title: 'Protect first', body: 'Lower volatility and more stability.' },
  { value: 'moderate', title: 'Balanced growth', body: 'A healthy mix of safety and upside.' },
  { value: 'aggressive', title: 'Growth max', body: 'More upside with bigger swings.' },
];

const horizonCards: Array<{ value: InvestmentHorizon; title: string; body: string }> = [
  { value: 'short_term', title: '1-3 years', body: 'Keep flexibility and preserve capital.' },
  { value: 'medium_term', title: '3-7 years', body: 'Blend compounding with stability.' },
  { value: 'long_term', title: '7+ years', body: 'Maximize runway for long-term growth.' },
];

function money(value: string) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function currency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

export default function OnboardingPage() {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    document.title = 'Your profile - WealthPath';
    const savedProfile = localStorage.getItem(STORAGE_KEY);
    if (!savedProfile) return;
    try {
      const parsed = JSON.parse(savedProfile) as FormState;
      setForm({
        ...initialState(),
        ...parsed,
        savingsGoals: parsed.savingsGoals?.length ? parsed.savingsGoals : [newGoal()],
        debts: parsed.debts?.length ? parsed.debts : [newDebt()],
      });
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
  }, [form]);

  const summary = useMemo(() => {
    const income = money(form.monthlyIncome);
    const expenses = money(form.monthlyExpenses);
    const surplus = Math.max(income - expenses, 0);
    const goalTarget = form.savingsGoals.reduce((sum, item) => sum + money(item.targetAmount), 0);
    const debtTotal = form.debts.reduce((sum, item) => sum + money(item.balance), 0);

    return [
      { label: 'Monthly income', value: income ? currency(income) : 'Add income' },
      { label: 'Free cash flow', value: surplus ? currency(surplus) : '$0' },
      { label: 'Goal target', value: goalTarget ? currency(goalTarget) : 'No goals yet' },
      { label: 'Debt tracked', value: debtTotal ? currency(debtTotal) : 'No debts yet' },
    ];
  }, [form]);

  const stepInsights = useMemo(() => {
    const income = money(form.monthlyIncome);
    const expenses = money(form.monthlyExpenses);
    const surplus = Math.max(income - expenses, 0);
    const topPriorityGoal = form.savingsGoals.find((goal) => goal.priority === 'high' && goal.name.trim());
    const activeDebtCount = form.debts.filter((debt) => debt.name.trim() || debt.balance.trim()).length;

    if (step === 0) {
      return [
        {
          label: 'Monthly runway',
          value: surplus ? currency(surplus) : '$0',
          body: 'This becomes the monthly engine for saving, investing, and debt payoff.',
        },
        {
          label: 'Income ratio',
          value: income > 0 ? `${Math.min(Math.round((expenses / income) * 100), 999)}% used` : 'Waiting on inputs',
          body: 'Expense pressure helps shape how aggressive the plan can realistically be.',
        },
        {
          label: 'Profile depth',
          value: form.age ? 'Strong signal' : 'Needs basics',
          body: 'Age and employment help the system align recommendations with your timeline.',
        },
      ];
    }

    if (step === 1) {
      return [
        {
          label: 'Current stance',
          value: form.riskTolerance.replace('_', ' '),
          body: 'Risk tolerance controls what kinds of assets the AI is even allowed to surface.',
        },
        {
          label: 'Horizon',
          value: form.investmentHorizon.replace('_', ' '),
          body: 'Longer timelines support more volatility and stronger compounding assumptions.',
        },
        {
          label: 'Strategy fit',
          value: form.riskTolerance === 'conservative' ? 'Stability first' : form.riskTolerance === 'moderate' ? 'Balanced compounding' : 'Growth-led',
          body: 'This combination shapes the tone of the plan before a single asset is chosen.',
        },
      ];
    }

    if (step === 2) {
      return [
        {
          label: 'Goals added',
          value: `${form.savingsGoals.length}`,
          body: 'More goals help the future plan allocate money with clearer tradeoffs.',
        },
        {
          label: 'Top priority',
          value: topPriorityGoal?.name || 'Not set yet',
          body: 'High-priority goals get the strongest attention in the final recommendation mix.',
        },
        {
          label: 'Capital target',
          value: summary[2].value,
          body: 'This total gives the product a sense of the scale you are planning toward.',
        },
      ];
    }

    return [
      {
        label: 'Debt entries',
        value: `${activeDebtCount}`,
        body: 'Each debt entry sharpens payoff ordering and monthly allocation logic.',
      },
      {
        label: 'Debt load',
        value: summary[3].value,
        body: 'Outstanding balances affect whether the plan should prioritize investing or payoff.',
      },
      {
        label: 'Decision quality',
        value: activeDebtCount > 0 ? 'More precise' : 'Debt-free path',
        body: 'Debt context keeps the future plan from making generic, unrealistic recommendations.',
      },
    ];
  }, [form, step, summary]);

  const setField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field as string];
      return next;
    });
  };

  const validateStep = () => {
    const next: Record<string, string> = {};
    if (step === 0) {
      if (money(form.monthlyIncome) <= 0) next.monthlyIncome = 'Add your monthly income.';
      if (form.monthlyExpenses === '') next.monthlyExpenses = 'Add your monthly expenses.';
      if (money(form.age) < 18) next.age = 'Enter an age of 18 or above.';
    }
    if (step === 2) {
      form.savingsGoals.forEach((goal) => {
        if (!goal.name.trim() || money(goal.targetAmount) <= 0) {
          next[`goal-${goal.id}`] = 'Each goal needs a name and target amount.';
        }
      });
    }
    if (step === 3) {
      form.debts.forEach((debt) => {
        const hasValue = debt.name || debt.balance || debt.minPayment || debt.interestRate;
        if (!hasValue) return;
        if (!debt.name.trim() || money(debt.balance) <= 0 || money(debt.minPayment) <= 0) {
          next[`debt-${debt.id}`] = 'Each debt needs a name, balance, and minimum payment.';
        }
      });
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const continueStep = () => {
    if (!validateStep()) return;
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const saveProfile = () => {
    if (!validateStep()) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    setSaved(true);
  };

  const inputClass =
    'w-full rounded-xl border px-4 py-3 font-body text-[0.9rem] outline-none transition-all';

  if (saved) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center px-6 py-12" style={{ background: 'var(--bg)' }}>
        <div className="w-full max-w-[520px] rounded-[28px] p-8 text-center" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}>
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full" style={{ background: 'var(--accent-light)', color: 'var(--accent-deep)' }}>
            <ShieldCheck className="h-8 w-8" />
          </div>
          <h1 className="mb-2 font-display text-[2rem] tracking-tight" style={{ color: 'var(--ink)' }}>Profile saved.</h1>
          <p className="mx-auto mb-7 max-w-[390px] font-body text-[0.92rem] leading-relaxed" style={{ color: 'var(--muted)' }}>
            Your financial profile is now stored locally, ready to power plan generation once we connect the backend.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <button type="button" onClick={() => setSaved(false)} className="rounded-xl border px-4 py-3 font-body text-[0.88rem] font-medium" style={{ borderColor: 'var(--border)', color: 'var(--ink)' }}>
              Keep editing
            </button>
            <button type="button" onClick={() => navigate('/')} className="rounded-xl px-4 py-3 font-body text-[0.88rem] font-semibold text-white" style={{ background: 'var(--accent)' }}>
              Back to site
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh]" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f7faf9 100%)' }}>
      <div className="mx-auto max-w-[1280px] px-6 py-8 lg:px-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <Link to="/" className="inline-flex items-center gap-3">
            <BrandLogo iconClassName="h-10 w-10 rounded-xl" textClassName="font-body text-[0.98rem] font-semibold" />
          </Link>
          <button type="button" onClick={() => navigate(-1)} className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-body text-[0.82rem] font-medium" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--muted)' }}>
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_390px]">
          <div className="overflow-hidden rounded-[30px]" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}>
            <div className="border-b px-6 py-5 sm:px-8" style={{ borderColor: 'var(--border)' }}>
              <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="mb-2 font-body text-[0.75rem] font-semibold uppercase tracking-[0.24em]" style={{ color: 'var(--accent-deep)' }}>Profile setup</p>
                  <h1 className="font-display text-[2rem] tracking-tight" style={{ color: 'var(--ink)' }}>Build the money profile behind your plan.</h1>
                </div>
                <div className="rounded-2xl px-4 py-3" style={{ background: 'var(--accent-light)' }}>
                  <p className="font-body text-[0.72rem] font-semibold uppercase tracking-[0.18em]" style={{ color: 'var(--accent-deep)' }}>Step {step + 1} of {steps.length}</p>
                  <p className="mt-1 font-body text-[0.86rem]" style={{ color: 'var(--ink-2)' }}>{steps[step]}</p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-4">
                {steps.map((item, index) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      if (index <= step || validateStep()) setStep(index);
                    }}
                    className="rounded-2xl px-3 py-3 text-left"
                    style={{
                      background: index === step ? 'var(--ink)' : index < step ? 'var(--accent-light)' : 'var(--bg-secondary)',
                      color: index === step ? '#ffffff' : 'var(--ink)',
                      border: index === step ? '1px solid var(--ink)' : '1px solid var(--border)',
                    }}
                  >
                    <p className="font-body text-[0.7rem] uppercase tracking-[0.18em]" style={{ color: index === step ? 'rgba(255,255,255,0.72)' : 'var(--muted-2)' }}>0{index + 1}</p>
                    <p className="mt-1 font-body text-[0.84rem] font-medium">{item}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="px-6 py-6 sm:px-8 sm:py-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? {} : { opacity: 0, y: -10 }}
                  transition={{ duration: reduceMotion ? 0 : 0.22 }}
                >
                  {step === 0 && (
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <p className="mb-2 font-display text-[1.4rem]" style={{ color: 'var(--ink)' }}>Start with the numbers that drive every recommendation.</p>
                        <p className="font-body text-[0.9rem] leading-relaxed" style={{ color: 'var(--muted)' }}>Income, expenses, age, and employment tell WealthPath how much room you have to save, invest, and pay down debt.</p>
                      </div>
                      <div className="grid gap-4">
                        <label>
                          <span className="mb-1.5 block font-body text-[0.8rem] font-medium" style={{ color: 'var(--ink-2)' }}>Monthly income</span>
                          <input value={form.monthlyIncome} onChange={(e) => setField('monthlyIncome', e.target.value.replace(/[^\d.]/g, ''))} className={inputClass} style={{ borderColor: errors.monthlyIncome ? '#ef4444' : 'var(--border)', background: 'var(--bg-secondary)' }} placeholder="6800" />
                          {errors.monthlyIncome && <p className="mt-1 text-[0.75rem] text-red-500">{errors.monthlyIncome}</p>}
                        </label>
                        <label>
                          <span className="mb-1.5 block font-body text-[0.8rem] font-medium" style={{ color: 'var(--ink-2)' }}>Monthly expenses</span>
                          <input value={form.monthlyExpenses} onChange={(e) => setField('monthlyExpenses', e.target.value.replace(/[^\d.]/g, ''))} className={inputClass} style={{ borderColor: errors.monthlyExpenses ? '#ef4444' : 'var(--border)', background: 'var(--bg-secondary)' }} placeholder="3200" />
                          {errors.monthlyExpenses && <p className="mt-1 text-[0.75rem] text-red-500">{errors.monthlyExpenses}</p>}
                        </label>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <label>
                            <span className="mb-1.5 block font-body text-[0.8rem] font-medium" style={{ color: 'var(--ink-2)' }}>Age</span>
                            <input value={form.age} onChange={(e) => setField('age', e.target.value.replace(/[^\d]/g, ''))} className={inputClass} style={{ borderColor: errors.age ? '#ef4444' : 'var(--border)', background: 'var(--bg-secondary)' }} placeholder="24" />
                            {errors.age && <p className="mt-1 text-[0.75rem] text-red-500">{errors.age}</p>}
                          </label>
                          <label>
                            <span className="mb-1.5 block font-body text-[0.8rem] font-medium" style={{ color: 'var(--ink-2)' }}>Employment status</span>
                            <select value={form.employmentStatus} onChange={(e) => setField('employmentStatus', e.target.value as EmploymentStatus)} className={inputClass} style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
                              <option value="employed">Employed</option>
                              <option value="self_employed">Self-employed</option>
                              <option value="student">Student</option>
                              <option value="retired">Retired</option>
                            </select>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 1 && (
                    <div className="grid gap-8">
                      <div>
                        <p className="mb-2 font-display text-[1.4rem]" style={{ color: 'var(--ink)' }}>Tune the plan to your comfort zone and timeline.</p>
                        <p className="font-body text-[0.9rem] leading-relaxed" style={{ color: 'var(--muted)' }}>This decides how cautious or growth-focused your future recommendations should be.</p>
                      </div>
                      <div className="grid gap-4 lg:grid-cols-3">
                        {riskCards.map((card) => {
                          const active = form.riskTolerance === card.value;
                          return (
                            <button key={card.value} type="button" onClick={() => setField('riskTolerance', card.value)} className="rounded-[24px] p-5 text-left" style={{ background: active ? 'linear-gradient(180deg, #0f172a 0%, #0f3b34 100%)' : 'var(--bg-secondary)', border: active ? '1px solid rgba(16,185,129,0.25)' : '1px solid var(--border)', color: active ? '#ffffff' : 'var(--ink)' }}>
                              <p className="mb-2 font-display text-[1.2rem]">{card.title}</p>
                              <p className="font-body text-[0.86rem] leading-relaxed" style={{ color: active ? 'rgba(255,255,255,0.78)' : 'var(--muted)' }}>{card.body}</p>
                            </button>
                          );
                        })}
                      </div>
                      <div className="grid gap-4 md:grid-cols-3">
                        {horizonCards.map((card) => {
                          const active = form.investmentHorizon === card.value;
                          return (
                            <button key={card.value} type="button" onClick={() => setField('investmentHorizon', card.value)} className="rounded-2xl px-4 py-4 text-left" style={{ background: active ? 'var(--accent-light)' : 'var(--bg-secondary)', border: active ? '1px solid var(--accent-dim)' : '1px solid var(--border)' }}>
                              <p className="mb-1 font-body text-[0.9rem] font-semibold" style={{ color: 'var(--ink)' }}>{card.title}</p>
                              <p className="font-body text-[0.78rem] leading-relaxed" style={{ color: 'var(--muted)' }}>{card.body}</p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="grid gap-6">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <p className="mb-2 font-display text-[1.4rem]" style={{ color: 'var(--ink)' }}>Capture the goals your money should serve.</p>
                          <p className="font-body text-[0.9rem] leading-relaxed" style={{ color: 'var(--muted)' }}>Give each goal a target and priority so the plan knows what matters most.</p>
                        </div>
                        <button type="button" onClick={() => setField('savingsGoals', [...form.savingsGoals, newGoal()])} className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-body text-[0.82rem] font-medium" style={{ background: 'var(--accent-light)', color: 'var(--accent-deep)' }}>
                          <Plus className="h-4 w-4" />
                          Add goal
                        </button>
                      </div>
                      <div className="grid gap-4">
                        {form.savingsGoals.map((goal, index) => (
                          <div key={goal.id} className="rounded-[24px] p-5" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                            <div className="mb-4 flex items-center justify-between gap-4">
                              <div>
                                <p className="font-body text-[0.75rem] font-semibold uppercase tracking-[0.18em]" style={{ color: 'var(--muted-2)' }}>Goal {index + 1}</p>
                                <p className="font-display text-[1.15rem]" style={{ color: 'var(--ink)' }}>{goal.name.trim() || 'Untitled goal'}</p>
                              </div>
                              {form.savingsGoals.length > 1 && (
                                <button type="button" onClick={() => setField('savingsGoals', form.savingsGoals.filter((item) => item.id !== goal.id))} className="rounded-full p-2" style={{ background: '#ffffff', color: '#ef4444' }}>
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              )}
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                              <input value={goal.name} onChange={(e) => setField('savingsGoals', form.savingsGoals.map((item) => item.id === goal.id ? { ...item, name: e.target.value } : item))} className={inputClass} style={{ borderColor: 'var(--border)', background: '#ffffff' }} placeholder="Emergency fund, house deposit..." />
                              <select value={goal.priority} onChange={(e) => setField('savingsGoals', form.savingsGoals.map((item) => item.id === goal.id ? { ...item, priority: e.target.value as GoalPriority } : item))} className={inputClass} style={{ borderColor: 'var(--border)', background: '#ffffff' }}>
                                <option value="high">High priority</option>
                                <option value="medium">Medium priority</option>
                                <option value="low">Low priority</option>
                              </select>
                              <input value={goal.targetAmount} onChange={(e) => setField('savingsGoals', form.savingsGoals.map((item) => item.id === goal.id ? { ...item, targetAmount: e.target.value.replace(/[^\d.]/g, '') } : item))} className={inputClass} style={{ borderColor: 'var(--border)', background: '#ffffff' }} placeholder="Target amount" />
                              <input value={goal.currentAmount} onChange={(e) => setField('savingsGoals', form.savingsGoals.map((item) => item.id === goal.id ? { ...item, currentAmount: e.target.value.replace(/[^\d.]/g, '') } : item))} className={inputClass} style={{ borderColor: 'var(--border)', background: '#ffffff' }} placeholder="Current amount" />
                            </div>
                            {errors[`goal-${goal.id}`] && <p className="mt-3 text-[0.75rem] text-red-500">{errors[`goal-${goal.id}`]}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="grid gap-6">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <p className="mb-2 font-display text-[1.4rem]" style={{ color: 'var(--ink)' }}>Add debts so the plan can prioritize payoff correctly.</p>
                          <p className="font-body text-[0.9rem] leading-relaxed" style={{ color: 'var(--muted)' }}>Leave the fields blank if you have none, or track each balance for smarter strategy later.</p>
                        </div>
                        <button type="button" onClick={() => setField('debts', [...form.debts, newDebt()])} className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-body text-[0.82rem] font-medium" style={{ background: 'var(--accent-light)', color: 'var(--accent-deep)' }}>
                          <Plus className="h-4 w-4" />
                          Add debt
                        </button>
                      </div>
                      <div className="grid gap-4">
                        {form.debts.map((debt, index) => (
                          <div key={debt.id} className="rounded-[24px] p-5" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                            <div className="mb-4 flex items-center justify-between gap-4">
                              <div>
                                <p className="font-body text-[0.75rem] font-semibold uppercase tracking-[0.18em]" style={{ color: 'var(--muted-2)' }}>Debt {index + 1}</p>
                                <p className="font-display text-[1.15rem]" style={{ color: 'var(--ink)' }}>{debt.name.trim() || 'Untitled debt'}</p>
                              </div>
                              {form.debts.length > 1 && (
                                <button type="button" onClick={() => setField('debts', form.debts.filter((item) => item.id !== debt.id))} className="rounded-full p-2" style={{ background: '#ffffff', color: '#ef4444' }}>
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              )}
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                              <input value={debt.name} onChange={(e) => setField('debts', form.debts.map((item) => item.id === debt.id ? { ...item, name: e.target.value } : item))} className={inputClass} style={{ borderColor: 'var(--border)', background: '#ffffff' }} placeholder="Card, loan, mortgage..." />
                              <select value={debt.type} onChange={(e) => setField('debts', form.debts.map((item) => item.id === debt.id ? { ...item, type: e.target.value as DebtType } : item))} className={inputClass} style={{ borderColor: 'var(--border)', background: '#ffffff' }}>
                                <option value="credit_card">Credit card</option>
                                <option value="student_loan">Student loan</option>
                                <option value="mortgage">Mortgage</option>
                                <option value="other">Other</option>
                              </select>
                              <input value={debt.balance} onChange={(e) => setField('debts', form.debts.map((item) => item.id === debt.id ? { ...item, balance: e.target.value.replace(/[^\d.]/g, '') } : item))} className={inputClass} style={{ borderColor: 'var(--border)', background: '#ffffff' }} placeholder="Balance" />
                              <input value={debt.minPayment} onChange={(e) => setField('debts', form.debts.map((item) => item.id === debt.id ? { ...item, minPayment: e.target.value.replace(/[^\d.]/g, '') } : item))} className={inputClass} style={{ borderColor: 'var(--border)', background: '#ffffff' }} placeholder="Minimum payment" />
                              <input value={debt.interestRate} onChange={(e) => setField('debts', form.debts.map((item) => item.id === debt.id ? { ...item, interestRate: e.target.value.replace(/[^\d.]/g, '') } : item))} className={`${inputClass} md:col-span-2`} style={{ borderColor: 'var(--border)', background: '#ffffff' }} placeholder="Interest rate %" />
                            </div>
                            {errors[`debt-${debt.id}`] && <p className="mt-3 text-[0.75rem] text-red-500">{errors[`debt-${debt.id}`]}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 grid gap-3 md:grid-cols-3">
                {stepInsights.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[22px] px-4 py-4"
                    style={{
                      background: 'linear-gradient(180deg, color-mix(in srgb, white 72%, var(--bg-secondary) 28%), var(--bg-secondary))',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <p
                      className="font-body text-[0.68rem] font-semibold uppercase tracking-[0.18em]"
                      style={{ color: 'var(--muted-2)' }}
                    >
                      {item.label}
                    </p>
                    <p className="mt-2 font-display text-[1.2rem] tracking-tight" style={{ color: 'var(--ink)' }}>
                      {item.value}
                    </p>
                    <p className="mt-2 font-body text-[0.78rem] leading-relaxed" style={{ color: 'var(--muted)' }}>
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-6" style={{ borderColor: 'var(--border)' }}>
                <button type="button" onClick={() => setStep((prev) => Math.max(prev - 1, 0))} disabled={step === 0} className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-body text-[0.84rem] font-medium disabled:opacity-40" style={{ background: 'var(--bg-secondary)', color: 'var(--ink)' }}>
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </button>
                {step === steps.length - 1 ? (
                  <button type="button" onClick={saveProfile} className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-body text-[0.88rem] font-semibold text-white" style={{ background: 'var(--accent)' }}>
                    Save profile
                    <ShieldCheck className="h-4 w-4" />
                  </button>
                ) : (
                  <button type="button" onClick={continueStep} className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-body text-[0.88rem] font-semibold text-white" style={{ background: 'var(--accent)' }}>
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[28px] p-6" style={{ background: 'linear-gradient(180deg, #0f172a 0%, #102d29 100%)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 24px 50px rgba(15, 23, 42, 0.18)' }}>
              <p className="mb-2 font-body text-[0.75rem] font-semibold uppercase tracking-[0.24em]" style={{ color: 'rgba(209,250,229,0.78)' }}>Live snapshot</p>
              <h2 className="mb-5 font-display text-[1.7rem] tracking-tight text-white">Your future dashboard starts here.</h2>
              <div className="space-y-3">
                {summary.map((item) => (
                  <div key={item.label} className="rounded-2xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <p className="font-body text-[0.72rem] uppercase tracking-[0.18em]" style={{ color: 'rgba(226,232,240,0.62)' }}>{item.label}</p>
                    <p className="mt-1 font-display text-[1.12rem] text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <p className="mb-3 font-body text-[0.75rem] font-semibold uppercase tracking-[0.24em]" style={{ color: 'var(--muted-2)' }}>Why this matters</p>
              <ul className="space-y-3">
                {[
                  'Income and expenses create the monthly planning engine.',
                  'Risk tolerance filters what assets the AI should even consider.',
                  'Goals and debt priorities shape how future capital gets allocated.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full" style={{ background: 'var(--accent)' }} />
                    <span className="font-body text-[0.88rem] leading-relaxed" style={{ color: 'var(--ink-2)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
