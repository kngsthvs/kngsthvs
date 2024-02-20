import { Drawer } from "../../_components/drawer";
import { Content } from "../../enter/_components/content";
import { Form } from "../../enter/_components/form";

export default function Page() {
  return (
    <Drawer>
      <Content>
        <Form />
      </Content>
    </Drawer>
  );
}
