import { useState } from "react";
import { useLedger } from "../context/LedgerContext";
import { useTranslation } from "react-i18next";

export default function ExpenseForm({ onOpenOCR, onStartVoice }: { onOpenOCR: ()=>void; onStartVoice: ()=>void }) {
  const { addEntry } = useLedger();
  const { t } = useTranslation();

  const [amount, setAmount] = useState<number|''>('');
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0,10));
  const [vendor, setVendor] = useState("");
  const [category, setCategory] = useState("food");

  const submitManual = async () => {
    if (!amount || Number(amount) <= 0) {
      alert("Enter valid amount");
      return;
    }
    await addEntry({ amount: Number(amount), date, vendor, category, method: "manual" });
    setAmount(''); setVendor('');
  };

  const inputClass = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent transition-all duration-200";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  const buttonPrimaryClass = "flex-1 py-3 px-4 rounded-lg bg-[#1D4ED8] text-white font-semibold hover:bg-[#1E40AF] transition-colors duration-200 shadow-md";
  const buttonSecondaryClass = "flex-1 py-3 px-4 rounded-lg border border-gray-300 text-gray-800 font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-sm";


  return (
    <div className="p-6 space-y-5 bg-white rounded-xl shadow-lg max-w-md mx-auto my-6">
      <div>
        <label htmlFor="amount-input" className={labelClass}>{t("amount")}</label>
        <input 
          id="amount-input"
          value={amount} 
          onChange={e=>setAmount(e.target.value === "" ? "" : Number(e.target.value))} 
          type="number" 
          className={inputClass}
          aria-label={t("amount_label")} 
          placeholder="e.g., 5000"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="date-input" className={labelClass}>{t("date")}</label>
          <input 
            id="date-input"
            type="date" 
            value={date} 
            onChange={e=>setDate(e.target.value)} 
            className={inputClass} 
            aria-label={t("date_label")}
          />
        </div>
        <div>
          <label htmlFor="category-select" className={labelClass}>{t("category")}</label>
          <select 
            id="category-select"
            value={category} 
            onChange={e=>setCategory(e.target.value)} 
            className={inputClass}
            aria-label={t("category_label")}
          >
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="airtime">Airtime</option>
            <option value="misc">Misc</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="vendor-input" className={labelClass}>{t("vendor")}</label>
        <input 
          id="vendor-input"
          value={vendor} 
          onChange={e=>setVendor(e.target.value)} 
          className={inputClass} 
          aria-label={t("vendor_label")}
          placeholder="e.g., Local Market"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-5">
        <button onClick={submitManual} className={buttonPrimaryClass} aria-label={t("manual_add_label")}>{t("manual_add")}</button>
        <button onClick={onOpenOCR} className={buttonSecondaryClass} aria-label={t("scan_receipt_label")}>{t("scan_receipt")}</button>
        <button onClick={onStartVoice} className={buttonSecondaryClass} aria-label={t("voice_add_label")}>{t("voice_add")}</button>
      </div>
    </div>
  );
}
