import { useState } from "react";

export default function Home() {
    const [form, setForm] = useState({
        mortAmt: "",
        mortTerm: "",
        mortRate: "",
        mortType: ""

    })
    const [errors, setErrors] = useState({});
    const [computation, setComputation] = useState({
        monthlyRepayments: null,
        totalToBePaid: null,
    });

    function handleNumberFormat(e) {
        let value = e.target.value.split('').filter(char => !isNaN(char)).join('');
        let result = '';
        let count = 0;

        for (let i = value.length - 1; i >= 0; i--) {
            result = value[i] + result;
            count++;
            if (count % 3 === 0 && i !== 0) {
                result = ',' + result;
            }
        }

        e.target.value = result;
    }
    function restrictString(e) {
        let value = e.currentTarget.value;

        let result = value.replace(/[^\d.]/g, "")
        e.currentTarget.value = result;
    }



    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!form.mortAmt) newErrors.mortAmt = "This field is required";
        if (!form.mortTerm) newErrors.mortTerm = "This field is required";
        if (!form.mortRate) newErrors.mortRate = "This field is required";
        if (!form.mortType) newErrors.mortType = "This field is required";
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            calculateRepayments()
        }

    }

    const handleClear = () => {
        setComputation({
            monthlyRepayments: null,
            totalToBePaid: null,
        })
        setForm({
            mortAmt: "",
            mortTerm: "",
            mortRate: "",
            mortType: ""
        });
        setErrors({});
    }

    function calculateRepayments() {
        setComputation({ monthlyRepaymets: null, totalToBePaid: null });
        let money = form.mortAmt;
        let principleAmt = money.replace(/,/g, "");
        let monthlyRate = form.mortRate / 12 / 100;
        let payments = form.mortTerm * 12;

        let monthlyPayment = (principleAmt * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -payments));
        let formattedMonthlyPayment = formatNumbers(monthlyPayment);

        let totYouPay = monthlyPayment * payments
        let formattedTotYouPay = formatNumbers(totYouPay);

        let totalInterestPaid = totYouPay - principleAmt;
        let monthlyInterestPayments = totalInterestPaid / payments;
        let formattedTotalInterestPaid = formatNumbers(totalInterestPaid);
        let formattedMonthlyInterestPayments = formatNumbers(monthlyInterestPayments);

        if (form.mortType === "repayment") {
            setComputation({ monthlyRepayments: formattedMonthlyPayment, totalToBePaid: formattedTotYouPay })
        } else {
            setComputation({ monthlyRepayments: formattedMonthlyInterestPayments, totalToBePaid: formattedTotalInterestPaid })
        }

    }


    const formatNumbers = (toBeFormated) => {
        let ourValue = toBeFormated.toLocaleString("en-GB", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        return ourValue;
    }

    return (
        <main className="min-h-screen bg-(--slate-100) md:flex items-center justify-center ">

            <section className="flex flex-col md:flex-row md:w-[min(calc(100%-2rem),60rem)] md:rounded-xl md:bg-white md:overflow-hidden md:gap-6 ">
                <div className="bg-white px-4 py-6 space-y-8 md:flex-1">
                    <div className="flex flex-col md:flex-row justify-between  gap-3">
                        <h1 className="font-bold tracking-wide text-2xl md:text-xl text-(--slate-900)">Mortgage Calculator</h1>
                        <button
                            onClick={handleClear}
                            className=" w-max underline text-(--slate-700) hover:cursor-pointer">Clear All</button>
                    </div>

                    <form onSubmit={handleSubmit} className="w-full space-y-4">

                        <div className="" >
                            <label className="text-(--slate-700) mb-2 block" htmlFor="mort-amount">Mortgage Amount</label>
                            <div className="relative long-in ">
                                <input
                                    value={form.mortAmt}
                                    onChange={(e) => {
                                        handleNumberFormat(e);
                                        setForm((prev) => ({ ...prev, mortAmt: e.target.value }));

                                    }}
                                    className={`hover:cursor-pointer border-[1px] w-full py-2 pl-16 font-bold focus:border-(--lime) focus:outline-(--lime) focus:outline-1 border-solid ${errors.mortAmt ? "border-(--red)" : "border-(--slate-300)"} rounded-sm`}
                                    type="text" name="mort-amount" id="mort-amount" />
                                <span className={`absolute ${errors.mortAmt ? "bg-(--red) text-white" : "bg-(--slate-100) text-(--slate-700)"} left-[1px] top-0 bottom-0 my-auto h-[calc(100%-2px)] w-12 px-2 flex justify-center rounded-tl-sm rounded-bl-sm items-center  font-bold`}>£</span>
                            </div>
                            {errors.mortAmt ?
                                <span className={`block h-[22px] ${errors.mortAmt ? "text-red-400" : "text-transparent"} transition-colors duration-300 ease-in-out text-sm`}>{errors.mortAmt}</span> : ""}
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                            <div>
                                <label className="text-(--slate-700) mb-2 block" htmlFor="mortgage-term">Mortgage Term</label>
                                <div className="relative w-full long-in  ">
                                    <input
                                        value={form.mortTerm}
                                        onChange={(e) => {
                                            restrictString(e);
                                            setForm(prev => ({ ...prev, mortTerm: e.target.value }))
                                        }}
                                        className={`hover:cursor-pointer border-1 overflow-hidden h-full w-full font-bold py-2 pl-4 focus:border-(--lime) focus:outline-(--lime)   focus:outline-1 border-solid ${errors.mortTerm ? "border-(--red)" : "border-(--slate-300)"} rounded-sm`} type="text" name="mortgage-term" id="mortgage-term" />
                                    <span className={`absolute  ${errors.mortTerm ? "bg-(--red) text-white" : " bg-(--slate-100) text-(--slate-700)"} right-[1px] top-0 bottom-0 my-auto h-[calc(100%-2px)] w-max px-2 flex justify-center rounded-tr-sm rounded-br-sm items-center  font-bold`}>years</span>
                                </div>
                                <span className="block h-[22px] text-red-400 text-sm">{errors.mortTerm}</span>
                            </div>

                            <div>
                                <label className="text-(--slate-700) mb-2 block" htmlFor="int-rate">Interest Rate</label>
                                <div className="relative long-in ">
                                    <input
                                        value={form.mortRate}
                                        onChange={(e) => {
                                            restrictString(e)
                                            setForm(prev => ({ ...prev, mortRate: e.target.value }))
                                        }}
                                        className={`hover:cursor-pointer border-[1px] w-full py-2 pl-4 font-bold focus:border-(--lime) focus:outline-(--lime) focus:outline-1 border-solid ${errors.mortRate ? "border-(--red)" : "border-(--slate-300)"} rounded-sm`} type="text" name="int-rate" id="int-rate" />
                                    <span className={`absolute  ${errors.mortRate ? "bg-(--red) text-white" : "bg-(--slate-100)  text-(--slate-700) "} right-[1px] top-0 bottom-0 my-auto h-[calc(100%-2px)] w-max px-2 flex justify-center rounded-tr-sm rounded-br-sm items-center font-bold`}>%</span>
                                </div>
                                <span className="block h-[22px] text-red-400 text-sm">{errors.mortRate}</span>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-(--slate-700) mb-4">Mortgage Type</h4>

                            <label className="text-(--slate-900) font-bold container" htmlFor="input-radio-repayment">
                                Repayment
                                <input
                                    checked={form.mortType === "repayment"}
                                    onChange={(e) => {
                                        setForm((prev) => ({ ...prev, mortType: e.target.value }))
                                    }}
                                    type="radio" name="input-radio-mort-type" id="input-radio-repayment" value="repayment" />
                                <span className="checkmark"></span>
                            </label>


                            <label className="text-(--slate-900) font-bold container" htmlFor="input-radio-interest-only">
                                Interest Only
                                <input
                                    checked={form.mortType === "interest only"}
                                    onChange={(e) => {
                                        setForm((prev) => ({ ...prev, mortType: e.target.value }))
                                    }}
                                    type="radio" name="input-radio-mort-type" id="input-radio-interest-only" value="interest only" />
                                <span className="checkmark"></span>
                            </label>

                            <span className="block h-[22px] text-red-400 text-sm">{errors.mortType}</span>
                        </div>

                        <button className="hover:cursor-pointer opacity-100 transition-opacity duration-300 ease-in-out hover:opacity-50 rounded-3xl w-full items-center justify-center gap-2 bg-(--lime) text-(--slate-900) font-bold flex py-2 px-4 md:w-max" type="submit">
                            <img src="/assets/images/icon-calculator.svg" alt="calculate" />
                            Calculate Repayments</button>
                    </form>


                </div>

                <div className="bg-(--slate-900) md:flex-1 md:rounded-bl-[5rem] md:flex md:justify-center px-4 lg:px-8 ">
                    {
                        computation.monthlyRepayments === null ?
                            <div className="flex flex-col items-center gap-4 py-6 md:my-auto">
                                <div className=" flex justify-center">
                                    <img className="max-w-full max-h-full" src="/assets/images/illustration-empty.svg" alt="illustration empty" />
                                </div>
                                <h3 className="text-white font-bold text-2xl">Results shown here</h3>
                                <p className="text-center text-(--slate-300) max-w-80 md:max-w-[26rem]">
                                    Complete the form and click "calculate
                                    repayments" to see what your monthly
                                    repayments would be.
                                </p>
                            </div> : ""
                    }

                    {
                        computation.monthlyRepayments !== null ?
                            <div className="results-wrapper py-6">
                                <div className="space-y-4">
                                    <div className="space-y-4">
                                        <h1 className="text-white font-bold text-2xl">Your results</h1>
                                        <p className="text-(--slate-300)">
                                            Your results are shown below based on the information
                                            you provided. To adjust the results, edit the form and
                                            click "calculate repayments" again.
                                        </p>
                                    </div>
                                    <div className="bg-[#0e2431] px-4 py-4 space-y-8 rounded-md border-t-4 border-t-(--lime)">
                                        <div className="space-y-2 month-repay-box relative pb-4">
                                            <span className="text-(--slate-300) block">Your monthly repayments</span>
                                            <span className="text-(--lime) font-bold text-3xl lg:text-5xl">£<span>{computation.monthlyRepayments}</span></span>
                                        </div>

                                        <div className="space-y-2">
                                            <span className="text-(--slate-300) block">Total you'll repay over the term</span>
                                            <span className="text-(--slate-100) font-bold text-3xl">£<span>{computation.totalToBePaid}</span></span>

                                        </div>

                                    </div>
                                </div>
                            </div> : ""
                    }

                </div>
            </section>

        </main>
    )
}