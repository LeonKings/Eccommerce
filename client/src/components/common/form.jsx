import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
}) {
  function renderInputByComponent(Control) {
    let element = null;
    const value = formData[Control.name] || "";
    switch (Control.componentType) {
      case "Input":
        element = (
          <Input
            type={Control.type}
            placeholder={Control.placeholder}
            name={Control.name}
            id={Control.name}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [Control.name]: event.target.value,
              })
            }
          />
        );
        break;
      case "Select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [Control.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={Control.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {Control.options && Control.options.length > 0
                ? Control.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case "TextArea":
        element = (
          <Textarea
            name={Control.name}
            placeholder={Control.placeholder}
            id={Control.id}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [Control.name]: event.target.value,
              })
            }
          />
        );
        break;
      default:
        element = (
          <Input
            type={Control.type}
            placeholder={Control.placeholder}
            name={Control.name}
            id={Control.name}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [Control.name]: event.target.value,
              })
            }
          />
        );
        break;
    }
    return element;
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((Control) => (
          <div key={Control.name} className="grid w-full gap-1.5">
            <Label className="mb-1 px-1 text-start">{Control.label}</Label>
            {renderInputByComponent(Control)}
          </div>
        ))}
      </div>
      <Button type="submit" className="w-full mt-2">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

export default CommonForm;
