
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface TransactionFinancialCheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const TransactionFinancialCheckbox = ({
  checked,
  onCheckedChange
}: TransactionFinancialCheckboxProps) => {
  return (
    <div className="flex items-center space-x-2 mb-4">
      <Checkbox 
        id="generateFinancial" 
        checked={checked} 
        onCheckedChange={onCheckedChange} 
      />
      <Label htmlFor="generateFinancial" className="cursor-pointer">
        Gerar lançamento financeiro
      </Label>
    </div>
  );
}

export default TransactionFinancialCheckbox;
