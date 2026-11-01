import AppButton from "./AppButton.jsx";
import { ButtonGroup } from "react-bootstrap";

export default function AccountRoleTabs({ activeRole, onRoleChange }) {
  return (
    <div className="account-role-tabs mb-4">
      <ButtonGroup>
        <AppButton intent="primary" appearance={activeRole === "buyer" ? "fill" : "outline"} aria-pressed={activeRole === "buyer"} onClick={() => onRoleChange("buyer")}>
          Buyer
        </AppButton>

        <AppButton intent="primary" appearance={activeRole === "seller" ? "fill" : "outline"} aria-pressed={activeRole === "seller"} onClick={() => onRoleChange("seller")}>
          Seller
        </AppButton>

        <AppButton intent="primary" appearance={activeRole === "admin" ? "fill" : "outline"} aria-pressed={activeRole === "admin"} onClick={() => onRoleChange("admin")}>
          Admin
        </AppButton>
      </ButtonGroup>
    </div>
  );
}
