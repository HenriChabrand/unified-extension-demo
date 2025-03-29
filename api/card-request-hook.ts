import { NowRequest, NowResponse } from "@vercel/node";
import { Morph } from "run-morph-client";

export default async (
  req: NowRequest,
  res: NowResponse
): Promise<NowResponse> => {
  console.log(req.body);
  try {
    const request_id = req.body.id;
    if (!process.env.API_KEY || !process.env.API_SECRET) {
      throw new Error("API credentials not configured");
    }

    const morph = new Morph(process.env.API_KEY, process.env.API_SECRET);
    const cardBuilder = morph.newCardBuilder(request_id, true);

    const card_2 = cardBuilder.newCard("Morph License Agreement");
    card_2.setLink("https://henri.pm");

    card_2.newStatus("Status", "Awaiting Signature", "WARNING");
    card_2.newText("Until", "15/04/24");
    card_2.newText("Signee", "Mark Ross");
    card_2.newText(
      "Contract PDF",
      "voir le PDF",
      "https://app.runmorph.dev/embedded-flow"
    );
    card_2.newText("Owner", "Henri Chabrand");

    card_2.newAction(
      "OPEN_URL_IN_IFRAME",
      "Edit Contract",
      "https://app.runmorph.dev/embedded-flow"
    );
    card_2.newAction(
      "OPEN_URL",
      "Download as PDF",
      "https://app.runmorph.dev/embedded-flow"
    );

    const nda_card = cardBuilder.newCard("NDA Partners (V2.4)");
    nda_card.setLink("https://henri/pm");

    nda_card.newStatus("Status", "Signed", "SUCCESS");
    nda_card.newText("Since", "21/03/24");
    nda_card.newText("Signee", "Ron Swanson");
    nda_card.newText("Owner", "Henri Chabrand", "https://henri.pm");
    nda_card.newAction("REQUEST", "Success Action", "", "action_success");
    nda_card.newAction("REQUEST", "Failing Action", "", "action_failing");

    cardBuilder.newRootAction(
      "REQUEST",
      "Success Action",
      "",
      "action_success"
    );
    cardBuilder.newRootAction(
      "REQUEST",
      "Failing Action",
      "",
      "action_failing"
    );

    const debug_card = cardBuilder.newCard("Test");
    debug_card.newText("Debug", "true");
    debug_card.newAction(
      "OPEN_URL_IN_IFRAME",
      "Edit Contract",
      "https://app.runmorph.dev/embedded-flow"
    );

    const card_response = await cardBuilder.build();
    return res.status(201).send(card_response);
  } catch (error: unknown) {
    console.log(JSON.stringify(error));
    return res.status(500).json({
      message:
        "An error occurred when fetching the request id or sending post request.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
