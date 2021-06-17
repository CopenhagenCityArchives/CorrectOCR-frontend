import { IKBest, IToken } from "./i-token";

export class KBest implements IKBest {
    candidate: string;
    probability: number;

    constructor(json: JSON) {
        this.candidate   = json['candidate'];
        this.probability = json['probability'];
    }
}

export class Token implements IToken {
    bin: number;
    decision: string;
    doc_ID: number;
    discarded: number;
    frame: number[];
    gold: string;
    heuristic: string;
    hyphenated: string;
    image_url: string;
    index: number;
    original: string;
    page: number;
    selection: string[];
    token_info: string[];
    token_type: string;
    k_best: {
        [ order: number ]: KBest
    }

    constructor(json: JSON) {
        this.bin        = json['Bin'];
        this.decision   = json['Decision'];
        this.discarded  = json['Discarded'];
        this.doc_ID     = json['Doc ID'];
        this.frame      = json['Frame'];
        this.gold       = json['Gold'];
        this.heuristic  = json['Heuristic'];
        this.hyphenated = json['Hyphenated'];
        this.image_url  = json['image_url'];
        this.index      = json['Index'];
        this.original   = json['Original'];
        this.page       = json['Page']
        this.selection  = json['Selection'];
        this.token_info = json['Token info'];
        this.token_type = json['Token type'];
        this.k_best     = json['k-best'];
    };
}
