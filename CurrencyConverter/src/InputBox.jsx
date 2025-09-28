import React, { useState, useId } from "react";
function InputBox({
    label,
    amount,
    onChangeAmount,
    selectedOptoin = 'usd',
    currencyOptions = [],
    onChangeCurrencyOption,
    AmountDisabled = false,
    CurrencyDisabled = false
}) {
    const uId = useId();

  return (
    <>
        <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:outline-white/10">
            <div className="grid grid-cols-2 gap-8">

                {/* From Amount Input */}
                <div>
                <label htmlFor={uId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {label}
                </label>
                <input
                    id={uId}
                    type="number"
                    className="w-full p-3 border rounded-md border-gray-300 text-black dark:border-gray-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter amount"
                    value={amount ?? ""}
                    disabled={AmountDisabled}
                    onChange={(e) => onChangeAmount && onChangeAmount(Number(e.target.value))}
                />
                </div>

                {/* Currency Selector */}
                <div>
                <label htmlFor={uId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Currency Type
                </label>
                <select
                    id={uId}
                    className="w-full p-3 border rounded-md border-gray-300 text-black dark:border-gray-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedOptoin}
                    onChange={(e) => onChangeCurrencyOption && onChangeCurrencyOption(e.target.value)}
                    disabled={CurrencyDisabled}
                >
                    {currencyOptions.map((currency) => (
                        <option key={currency} value={currency}>{currency}</option>
                    ))}
                </select>
                </div>

            </div>
        </div>
    </>
  );
}

export default InputBox;
