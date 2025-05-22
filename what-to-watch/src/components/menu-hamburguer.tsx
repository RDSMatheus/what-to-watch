import { Button, Drawer } from "flowbite-react";
import { Hamburger } from "lucide-react";
import { useState } from "react";

const MenuHamburguer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      <Button color={"alternative"} className="focus:ring-1">
        <Hamburger color="white" />
      </Button>
      <Drawer open={isOpen} onClose={handleClose}></Drawer>
    </div>
  );
};

export default MenuHamburguer;
