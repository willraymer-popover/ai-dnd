import { Assistant } from "./assistant";
import { MyRuntimeProvider } from "./MyRuntimeProvider";

export default function Home() {
  return (
    <MyRuntimeProvider>
      <Assistant />
    </MyRuntimeProvider>
  );
}
