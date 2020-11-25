import { IToken } from "./i-token";

export class Token implements IToken {
    firstBest: string;
    firstProb: number;
    secondBest: string;
    secondProb: number;
    thirdBest: string;
    thirdProb: number;
    fourthBest: string;
    fourthProb: number;
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
        1: {
            candidate: string;
            probability: number
        }
        2: {
            candidate: string;
            probability: number
        }
        3: {
            candidate: string;
            probability: number
        }
        4: {
            candidate: string;
            probability: number
        }
    }

    constructor(json: JSON) {
        this.firstBest  = json['1-best'];
        this.firstProb  = json['1-best prob.'];
        this.secondBest = json['2-best'];
        this.secondProb = json['2-best prob.'];
        this.thirdBest  = json['3-best'];
        this.thirdProb  = json['3-best prob.'];
        this.fourthBest = json['4-best'];
        this.fourthProb = json['4-best prob.'];
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
