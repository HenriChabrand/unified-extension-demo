"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const run_morph_client_1 = require("run-morph-client");
exports.default = async (req, res) => {
    var _a, _b, _c;
    console.log(req.body);
    try {
        const request_id = (_a = req.body.id) !== null && _a !== void 0 ? _a : "";
        if (!request_id) {
            throw new Error("Request ID is missing");
        }
        const apiKey = (_b = process.env.API_KEY) !== null && _b !== void 0 ? _b : "";
        const apiSecret = (_c = process.env.API_SECRET) !== null && _c !== void 0 ? _c : "";
        if (!apiKey || !apiSecret) {
            throw new Error("API credentials are missing");
        }
        let morph = new run_morph_client_1.Morph(apiKey, apiSecret);
        let cardBuilder = morph.newCardBuilder(request_id, true);
        let card2 = cardBuilder.newCard("Morph License Agreement");
        card2.setLink("https://henri.pm");
        card2.newStatus("Status", "Awaiting Signature", "WARNING");
        card2.newText("Until", "15/04/24");
        card2.newText("Signee", "Mark Ross");
        card2.newText("Contract PDF", "voir le PDF", "https://app.runmorph.dev/embedded-flow");
        card2.newText("Owner", "Henri Chabrand");
        card2.newAction("OPEN_URL_IN_IFRAME", "Edit Contract", "https://app.runmorph.dev/embedded-flow");
        card2.newAction("OPEN_URL", "Download as PDF", "https://app.runmorph.dev/embedded-flow");
        let card1 = cardBuilder.newCard("NDA Partners (V2.4)");
        card1.setLink("https://henri/pm");
        card1.newStatus("Status", "Signed", "SUCCESS");
        card1.newText("Since", "21/03/24");
        card1.newText("Signee", "Ron Swanson");
        card1.newText("Owner", "Henri Chabrand", "https://henri.pm");
        card1.newAction("REQUEST", "Success Action", undefined, "action_success");
        card1.newAction("REQUEST", "Failing Action", undefined, "action_failing");
        cardBuilder.newRootAction("REQUEST", "Success Action", undefined, "action_success");
        cardBuilder.newRootAction("REQUEST", "Failing Action", undefined, "action_failing");
        let card3 = cardBuilder.newCard("Test");
        card3.newText("Debug", "true");
        card3.newAction("OPEN_URL_IN_IFRAME", "Edit Contract", "https://app.runmorph.dev/embedded-flow");
        const card_response = await cardBuilder.build();
        res.status(201).send(card_response);
    }
    catch (error) {
        console.log(JSON.stringify(error));
        res.status(500).json({
            message: "An error occurred when fetching the request id or sending post request.",
            error: error.message,
        });
    }
};
