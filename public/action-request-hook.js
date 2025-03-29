"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const run_morph_client_1 = require("run-morph-client");
exports.default = async (req, res) => {
    var _a, _b, _c, _d, _e;
    console.log(req.body);
    try {
        const request_id = (_a = req.body.id) !== null && _a !== void 0 ? _a : "";
        if (!request_id)
            throw new Error("Request ID is missing");
        const apiKey = (_b = process.env.API_KEY) !== null && _b !== void 0 ? _b : "";
        const apiSecret = (_c = process.env.API_SECRET) !== null && _c !== void 0 ? _c : "";
        if (!apiKey || !apiSecret)
            throw new Error("API credentials are missing");
        let morph = new run_morph_client_1.Morph(apiKey, apiSecret);
        if (req.body.type === "card" && ((_d = req.body.context) === null || _d === void 0 ? void 0 : _d.card_id)) {
            let cardId = (_e = req.body.context.card_id) !== null && _e !== void 0 ? _e : "";
            let actionResponseBuilder = morph.newActionResponseBuilder(request_id);
            let action_succeed = cardId !== "card_failing";
            let action_message = `Card ${cardId} processed!`;
            let success = await actionResponseBuilder.build(action_succeed, action_message);
            if (success) {
                res.status(201).json({ message: "Created" });
                return;
            }
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred when processing the request.",
            error: error.message,
        });
    }
};
