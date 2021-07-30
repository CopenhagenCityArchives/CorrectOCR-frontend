import { IDocStats } from "./i-docstats";

export class DocStats implements IDocStats {
    index_count: number;
    token_count: number;
    hyphenated_count: number;
    discarded_count: number;
    error_count: number;
    corrected_count: number;
    corrected_by_annotator_count: number;
    corrected_by_model_count: number;
    uncorrected_count: number;
    empty_gold: number;
	done: boolean;

    constructor(json: JSON) {
        this.index_count       			   = json['index_count'];
        this.token_count       			   = json['token_count'];
        this.hyphenated_count     		   = json['hyphenated_count'];
        this.discarded_count      		   = json['discarded_count'];
        this.error_count    			   = json['error_count'];
        this.corrected_count     		   = json['corrected_count'];
        this.corrected_by_annotator_count  = json['corrected_by_annotator_count'];
        this.corrected_by_model_count      = json['corrected_by_model_count'];
        this.uncorrected_count   	       = json['uncorrected_count'];
        this.empty_gold     			   = json['empty_gold'];
        this.done     					   = json['done'];
    };
}

