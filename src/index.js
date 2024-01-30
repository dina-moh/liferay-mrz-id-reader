import App from './App';
import {createRoot} from "react-dom";

class WebComponent extends HTMLElement {
    connectedCallback() {
        this.root = createRoot(this);

        this.root.render(<App route={this.getAttribute('route')} />, this);
    }
    disconnectedCallback() {
        this.root.unmount();

        delete this.root;
    }
}

const ELEMENT_ID = 'liferay-mrz-document-reader';

if (!customElements.get(ELEMENT_ID)) {
    customElements.define(ELEMENT_ID, WebComponent);
}
