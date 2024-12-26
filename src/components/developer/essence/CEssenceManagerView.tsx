import { CEssenceControls } from "./CEssenceControls";
import { CEssenceEditor } from "./CEssenceEditor";
import { CEssenceTable } from "./CEssenceTable";
import "./CEssenceManagerView.css";

export function CEssenceManagerView() {
    return <div
        className="CEssenceMV"
    >
        <CEssenceEditor />
        <CEssenceTable/>
        <CEssenceControls />
    </div>
}
