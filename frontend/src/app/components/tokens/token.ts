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
    gold: string;
    heuristic: string;
    hyphenated: string;
    index: number;
    original: string;
    selection: string[];
    token_info: string[];
    token_type: string;
    image_url: string;

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
        this.doc_ID     = json['Doc ID'];
        this.gold       = json['Gold'];
        this.heuristic  = json['Heuristic'];
        this.hyphenated = json['Hyphenated'];
        this.index      = json['Index'];
        this.original   = json['Original'];
        this.selection  = json['Selection'];
        this.token_info = json['Token info'];
        this.token_type = json['Token type'];
        this.image_url  = json['image_url'];
    };

}