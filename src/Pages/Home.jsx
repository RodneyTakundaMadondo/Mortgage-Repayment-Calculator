export default function Home() {
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
    return (
        <main className="min-h-screen bg-(--slate-100) md:flex items-center justify-center ">

            <section className="flex flex-col md:flex-row md:w-[min(calc(100%-2rem),60rem)] md:rounded-xl md:bg-white md:overflow-hidden md:gap-6 ">
                <div className="bg-white px-4 py-6 space-y-8 md:flex-1">
                    <div className="flex flex-col md:flex-row justify-between  gap-3">
                        <h1 className="font-bold tracking-wide text-2xl md:text-xl text-(--slate-900)">Mortgage Calculator</h1>
                        <button className=" w-max underline text-(--slate-700) hover:cursor-pointer">Clear All</button>
                    </div>

                    <form action="" className="w-full space-y-4">

                        <div className="" >
                            <label className="text-(--slate-700) mb-2 block" htmlFor="mort-amount">Mortgage Amount</label>
                            <div className="relative long-in ">
                                <input
                                    onChange={handleNumberFormat}
                                    className="border-[1px] w-full py-2 pl-16 font-bold focus:border-(--lime) focus:outline-(--lime) focus:outline-1 border-solid border-(--slate-300) rounded-sm" type="text"  name="mort-amount" id="mort-amount" />
                                <span className="absolute bg-(--slate-100) left-[1px] top-0 bottom-0 my-auto h-[calc(100%-2px)] w-12 px-2 flex justify-center rounded-tl-sm rounded-bl-sm items-center text-(--slate-700) font-bold ">£</span>
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                            <div>
                                <label className="text-(--slate-700) mb-2 block" htmlFor="mortgage-term">Mortgage Term</label>
                                <div className="relative w-full long-in  ">
                                    <input
                                        onChange={restrictString}
                                        className="border-1 overflow-hidden h-full w-full font-bold py-2 pl-4 focus:border-(--lime) focus:outline-(--lime)   focus:outline-1 border-solid border-(--slate-300) rounded-sm" type="text" name="mortgage-term" id="mortgage-term" />
                                    <span className="absolute bg-(--slate-100) right-[1px] top-0 bottom-0 my-auto h-[calc(100%-2px)] w-max px-2 flex justify-center rounded-tr-sm rounded-br-sm items-center text-(--slate-700) font-bold">years</span>
                                </div>
                            </div>

                            <div>
                                <label className="text-(--slate-700) mb-2 block" htmlFor="int-rate">Interest Rate</label>
                                <div className="relative long-in ">
                                    <input
                                        onChange={restrictString}
                                        className="border-[1px] w-full py-2 pl-4 font-bold focus:border-(--lime) focus:outline-(--lime) focus:outline-1 border-solid border-(--slate-300) rounded-sm" type="text" name="int-rate" id="int-rate" />
                                    <span className="absolute bg-(--slate-100) right-[1px] top-0 bottom-0 my-auto h-[calc(100%-2px)] w-max px-2 flex justify-center rounded-tr-sm rounded-br-sm items-center text-(--slate-700) font-bold ">%</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-(--slate-700) mb-4">Mortgage Type</h4>

                            <label className="text-(--slate-900) font-bold container" htmlFor="input-radio-repayment">
                                Repayment
                                <input type="radio" name="input-radio-mort-type" id="input-radio-repayment" />
                                <span className="checkmark"></span>
                            </label>


                            <label className="text-(--slate-900) font-bold container" htmlFor="input-radio-interest-only">
                                Interest Only
                                <input type="radio" name="input-radio-mort-type" id="input-radio-interest-only" />
                                <span className="checkmark"></span>
                            </label>


                        </div>
                        <button className="rounded-3xl w-full items-center justify-center gap-2 bg-(--lime) text-(--slate-900) font-bold flex py-2 px-4 md:w-max" type="submit">
                            <img src="/assets/images/icon-calculator.svg" alt="calculate" />
                            Calculate Repayments</button>
                    </form>


                </div>

                <div className="bg-(--slate-900) md:flex-1 md:rounded-bl-[5rem] md:flex md:justify-center px-4 ">
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
                    </div>

                </div>
            </section>

        </main>
    )
}