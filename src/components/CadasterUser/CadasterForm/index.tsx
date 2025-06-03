import { useReducer, useState } from "react"
import Button from "@/components/FormComponents/Button"
import Input from "@/components/FormComponents/Input"
import { toast } from "react-toastify"
import { api } from "@/api/api"
import Select, { SingleValue } from "react-select";
import { customStyles } from "@/styles/SelectReact"
import { Trash } from "phosphor-react"

interface FormState {
  username: string
  real_name: string
  company_ids: number[]
  roles: string[]
  plan: string[]
  external_id: string
}

type FormAction =
  | { type: "setUsername"; payload: string }
  | { type: "setRealName"; payload: string }
  | { type: "setCompanyId"; payload: number[] }
  | { type: "setRoles"; payload: string }
  | { type: "setPlanos"; payload: string }
  | { type: "setExternalId"; payload: string }
  | { type: "reset" }

const initialState: FormState = {
  username: "",
  real_name: "",
  company_ids: [],
  roles: [],
  plan: [],
  external_id: "",
}

type OptionType = {
  label: string;
  value: string;
};

const clearOption: OptionType = { label: "❌ Limpar seleção", value: "" };

const roleOptions: OptionType[] = [
  { label: "ADMIN", value: "ADMIN" },
  { label: "USER_APPROVER", value: "USER_APPROVER" },
];

const planosOptions: OptionType[] = [
  { label: "PRO", value: "PRO" },
  { label: "BASIC", value: "BASIC" },
];

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "setUsername":
      return { ...state, username: action.payload }
    case "setRealName":
      return { ...state, real_name: action.payload }
    case "setCompanyId":
      return {
        ...state,
        company_ids: action.payload,
      };
    case "setRoles":
      return { ...state, roles: [action.payload] }
    case "setPlanos":
      return { ...state, plan: [action.payload] }
    case "setExternalId":
      return { ...state, external_id: action.payload }
    case "reset":
      return initialState;
    default:
      return state
  }
}

export default function CadasterForm() {
  const [state, dispatch] = useReducer(formReducer, initialState)
  const [companyIdInput, setCompanyIdInput] = useState("");

  const handleSubmit = async () => {
    try {
      await api.post("/v1/user/new", state)
      toast.success("Usuário cadastrado com sucesso!")
      dispatch({ type: "reset" });
      setCompanyIdInput("");
    } catch (err: any) {
      toast.error("Erro ao realizar o cadastro.")
    }
  }

  return (
    <div className="flex flex-col justify-center gap-4 max-w-7xl w-full">
      <div className="flex w-full gap-4 justify-center">
        <Input
          label="Email"
          componentStyle="w-full"
          value={state.username}
          onChange={(e) => dispatch({ type: "setUsername", payload: e.target.value })}
        />
        <Input
          label="Name"
          componentStyle="w-full"
          value={state.real_name}
          onChange={(e) => dispatch({ type: "setRealName", payload: e.target.value })}
        />
      </div>
      <div className="flex w-full gap-4 justify-center">
        <div className="flex flex-col w-full gap-2">
          <Input
            label="ID Empresa"
            componentStyle="w-full"
            type="number"
            value={companyIdInput}
            onChange={(e) => setCompanyIdInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const id = parseInt(companyIdInput);
                if (!isNaN(id) && !state.company_ids.includes(id)) {
                  dispatch({
                    type: "setCompanyId",
                    payload: [...state.company_ids, id],
                  });
                }
                setCompanyIdInput("");
              }
            }}
          />
          <ul className="flex flex-wrap w-full gap-2 text-lg mt-2">
            {state.company_ids.map((id) => (
              <li
                key={id}
                className="group relative flex items-center justify-center rounded-2xl min-w-14 border-[1px] border-[#97440c] p-4"
              >
                {id}
                <button
                  onClick={() =>
                    dispatch({
                      type: "setCompanyId",
                      payload: state.company_ids.filter((item) => item !== id),
                    })
                  }
                  className="absolute bg-[#97440c]/50 text-gray-900 rounded-2xl w-full h-full cursor-pointer hidden group-hover:flex items-center justify-center"
                  title="Remover ID"
                >
                  <Trash size={32} weight="bold" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col w-full">
          <label className="mb-1">Roles</label>
          <Select<OptionType>
            placeholder="Selecione"
            value={roleOptions.find((o) => o.value === state.roles[0]) || null}
            onChange={(selected: SingleValue<OptionType>) => {
              if (selected) {
                dispatch({ type: "setRoles", payload: selected.value });
              }
            }}
            options={roleOptions}
            isSearchable
            styles={customStyles}
          />
        </div>
      </div>
      <div className="flex w-full gap-4">
        <Input
          label="External ID"
          componentStyle="w-full"
          value={state.external_id}
          onChange={(e) => dispatch({ type: "setExternalId", payload: e.target.value })}
        />

        <div className="flex flex-col w-full">
          <label className="mb-1">Planos</label>
          <Select<OptionType>
            placeholder="Selecione"
            value={planosOptions.find((o) => o.value === state.plan[0]) || null}
            onChange={(selected: SingleValue<OptionType>) => {
              if (selected) {
                dispatch({ type: "setPlanos", payload: selected.value });
              }
            }}
            options={planosOptions}
            isSearchable
            styles={customStyles}
          />
        </div>
      </div>

      <Button
        title="Cadastrar Usuário"
        containerStyle="w-full mt-10"
        onClick={handleSubmit}
      />
    </div>
  )
}
