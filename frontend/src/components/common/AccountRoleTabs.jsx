import { ButtonGroup, Button } from "react-bootstrap";

export default function AccountRoleTabs({ activeRole, onRoleChange }) {
  return (
    <div className="account-role-tabs mb-4">
      <ButtonGroup>
        <Button
          variant={activeRole === "buyer" ? "dark" : "outline-dark"}
          onClick={() => onRoleChange("buyer")}
        >
          Buyer
        </Button>

        <Button
          variant={activeRole === "seller" ? "dark" : "outline-dark"}
          onClick={() => onRoleChange("seller")}
        >
          Seller
        </Button>

        <Button
          variant={activeRole === "admin" ? "dark" : "outline-dark"}
          onClick={() => onRoleChange("admin")}
        >
          Admin
        </Button>
      </ButtonGroup>
    </div>
  );
}
