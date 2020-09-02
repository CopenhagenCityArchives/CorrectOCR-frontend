import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../API/api.service';
import { Token } from '../tokens/token';
import { promise } from 'protractor';

@Component({
  selector: 'app-doc-tokens',
  templateUrl: './doc-tokens.component.html',
  styleUrls: ['./doc-tokens.component.scss']
})
export class DocTokensComponent implements OnInit {
  url = 'http://localhost:5000';

  promise: Promise<Object>;

  tokenList:Array<object> = new Array;
  correctedList:Array<object>;
  uncorrectedList:Array<object>;
  index: number = 0;

  mainToken: Token;
  leftToken: Token;
  rightToken: Token;

  response;

  constructor(private route: ActivatedRoute, private ApiService: ApiService) {
  }

  ngOnInit(): void {
    //using mock until response time is improved
    this.uncorrectedList = [
      {image_url: "/6148/token-6.png", info_url: "/6148/token-6.json", is_corrected: false, string: "La&s"},
      {image_url: "/6148/token-7.png", info_url: "/6148/token-7.json", is_corrected: false, string: "stter."},
      {image_url: "/6148/token-10.png", info_url: "/6148/token-10.json", is_corrected: false, string: "anskrør,"},
      {image_url: "/6148/token-27.png", info_url: "/6148/token-27.json", is_corrected: false, string: "lalet"},
      {image_url: "/6148/token-30.png", info_url: "/6148/token-30.json", is_corrected: false, string: "T^e."},
      {image_url: "/6148/token-42.png", info_url: "/6148/token-42.json", is_corrected: false, string: "idten."},
      {image_url: "/6148/token-45.png", info_url: "/6148/token-45.json", is_corrected: false, string: ":asse,"},
      {image_url: "/6148/token-47.png", info_url: "/6148/token-47.json", is_corrected: false, string: "raed"},
      {image_url: "/6148/token-54.png", info_url: "/6148/token-54.json", is_corrected: false, string: "lybninger."},
      {image_url: "/6148/token-58.png", info_url: "/6148/token-58.json", is_corrected: false, string: "paalimet"},
      {image_url: "/6148/token-62.png", info_url: "/6148/token-62.json", is_corrected: false, string: "6,"},
      {image_url: "/6148/token-71.png", info_url: "/6148/token-71.json", is_corrected: false, string: "emmelig"},
      {image_url: "/6148/token-73.png", info_url: "/6148/token-73.json", is_corrected: false, string: "'09)."},
      {image_url: "/6148/token-82.png", info_url: "/6148/token-82.json", is_corrected: false, string: "«*|„"},
      {image_url: "/6148/token-84.png", info_url: "/6148/token-84.json", is_corrected: false, string: "6,"},
      {image_url: "/6148/token-94.png", info_url: "/6148/token-94.json", is_corrected: false, string: "Politløvrlgheder."},
      {image_url: "/6148/token-100.png", info_url: "/6148/token-100.json", is_corrected: false, string: "Murersvendene:"},
      {image_url: "/6148/token-105.png", info_url: "/6148/token-105.json", is_corrected: false, string: "Nepken,"},
      {image_url: "/6148/token-137.png", info_url: "/6148/token-137.json", is_corrected: false, string: "Gummerup,"},
      {image_url: "/6148/token-167.png", info_url: "/6148/token-167.json", is_corrected: false, string: "giverenke"},
      {image_url: "/6148/token-231.png", info_url: "/6148/token-231.json", is_corrected: false, string: "Efternævnle"},
      {image_url: "/6148/token-247.png", info_url: "/6148/token-247.json", is_corrected: false, string: "Draaby"},
      {image_url: "/6148/token-259.png", info_url: "/6148/token-259.json", is_corrected: false, string: "hjemme­"},
      {image_url: "/6148/token-265.png", info_url: "/6148/token-265.json", is_corrected: false, string: "Lnursdotter"},
      {image_url: "/6148/token-271.png", info_url: "/6148/token-271.json", is_corrected: false, string: "hebruar"},
      {image_url: "/6148/token-274.png", info_url: "/6148/token-274.json", is_corrected: false, string: "Stabrand,"},
      {image_url: "/6148/token-275.png", info_url: "/6148/token-275.json", is_corrected: false, string: "Nødager"},
      {image_url: "/6148/token-287.png", info_url: "/6148/token-287.json", is_corrected: false, string: "Kjeldstrup"},
      {image_url: "/6148/token-289.png", info_url: "/6148/token-289.json", is_corrected: false, string: "tiggaard"},
      {image_url: "/6148/token-295.png", info_url: "/6148/token-295.json", is_corrected: false, string: "Politi­"},
      {image_url: "/6148/token-307.png", info_url: "/6148/token-307.json", is_corrected: false, string: "Chrlstiah"},
      {image_url: "/6148/token-325.png", info_url: "/6148/token-325.json", is_corrected: false, string: "uterligt"},
      {image_url: "/6148/token-332.png", info_url: "/6148/token-332.json", is_corrected: false, string: "6"},
      {image_url: "/6148/token-343.png", info_url: "/6148/token-343.json", is_corrected: false, string: "for­"},
      {image_url: "/6148/token-347.png", info_url: "/6148/token-347.json", is_corrected: false, string: "Rpinkel,"},
      {image_url: "/6148/token-357.png", info_url: "/6148/token-357.json", is_corrected: false, string: "Yest"},
      {image_url: "/6148/token-359.png", info_url: "/6148/token-359.json", is_corrected: false, string: "Ben­"},
      {image_url: "/6148/token-369.png", info_url: "/6148/token-369.json", is_corrected: false, string: "kortskaitede"},
      {image_url: "/6148/token-374.png", info_url: "/6148/token-374.json", is_corrected: false, string: "tif"},
      {image_url: "/6148/token-376.png", info_url: "/6148/token-376.json", is_corrected: false, string: "Herrredskontor."},
      {image_url: "/6148/token-384.png", info_url: "/6148/token-384.json", is_corrected: false, string: "Band­"},
      {image_url: "/6148/token-391.png", info_url: "/6148/token-391.json", is_corrected: false, string: "Omkost­"},
      {image_url: "/6148/token-399.png", info_url: "/6148/token-399.json", is_corrected: false, string: "Gadeuorden."},
      {image_url: "/6148/token-409.png", info_url: "/6148/token-409.json", is_corrected: false, string: "79—1."},
      {image_url: "/6148/token-414.png", info_url: "/6148/token-414.json", is_corrected: false, string: "66—3."},
      {image_url: "/6148/token-420.png", info_url: "/6148/token-420.json", is_corrected: false, string: "97—4."},
      {image_url: "/6148/token-423.png", info_url: "/6148/token-423.json", is_corrected: false, string: "Fristrup,"},
      {image_url: "/6148/token-426.png", info_url: "/6148/token-426.json", is_corrected: false, string: "97—1."},
      {image_url: "/6148/token-433.png", info_url: "/6148/token-433.json", is_corrected: false, string: "Kriminal-"},
      {image_url: "/6148/token-437.png", info_url: "/6148/token-437.json", is_corrected: false, string: "Krimi-"},
      {image_url: "/6148/token-448.png", info_url: "/6148/token-448.json", is_corrected: false, string: "AVolframsdorff,"},
      {image_url: "/6148/token-458.png", info_url: "/6148/token-458.json", is_corrected: false, string: "Jurisdiktio­"},
      {image_url: "/6148/token-474.png", info_url: "/6148/token-474.json", is_corrected: false, string: "6."},
      {image_url: "/6148/token-490.png", info_url: "/6148/token-490.json", is_corrected: false, string: "Kallnnd-"},
      {image_url: "/6148/token-495.png", info_url: "/6148/token-495.json", is_corrected: false, string: "Fredriksen,"},
      {image_url: "/6148/token-498.png", info_url: "/6148/token-498.json", is_corrected: false, string: "Hornbæk"},
      {image_url: "/6148/token-527.png", info_url: "/6148/token-527.json", is_corrected: false, string: "|5041]."},
      {image_url: "/6148/token-541.png", info_url: "/6148/token-541.json", is_corrected: false, string: "Oktøber"},
      {image_url: "/6148/token-550.png", info_url: "/6148/token-550.json", is_corrected: false, string: "Lunde-Skam"},
      {image_url: "/6148/token-554.png", info_url: "/6148/token-554.json", is_corrected: false, string: "Indsidder"},
      {image_url: "/6148/token-563.png", info_url: "/6148/token-563.json", is_corrected: false, string: "Otterup."},
      {image_url: "/6148/token-581.png", info_url: "/6148/token-581.json", is_corrected: false, string: "Fjends-Nørlyng"},
      {image_url: "/6148/token-588.png", info_url: "/6148/token-588.json", is_corrected: false, string: "Isager,"},
      {image_url: "/6148/token-591.png", info_url: "/6148/token-591.json", is_corrected: false, string: "6."},
      {image_url: "/6148/token-595.png", info_url: "/6148/token-595.json", is_corrected: false, string: "Pederstrup,"},
      {image_url: "/6148/token-596.png", info_url: "/6148/token-596.json", is_corrected: false, string: "Vinderslev"},
      {image_url: "/6148/token-603.png", info_url: "/6148/token-603.json", is_corrected: false, string: "Byfogderne"},
      {image_url: "/6148/token-622.png", info_url: "/6148/token-622.json", is_corrected: false, string: "Hjerk"},
      {image_url: "/6148/token-629.png", info_url: "/6148/token-629.json", is_corrected: false, string: "0)"},
      {image_url: "/6148/token-632.png", info_url: "/6148/token-632.json", is_corrected: false, string: "Arts-Skippinge"},
      {image_url: "/6148/token-640.png", info_url: "/6148/token-640.json", is_corrected: false, string: "Viskende,"},
      {image_url: "/6148/token-645.png", info_url: "/6148/token-645.json", is_corrected: false, string: "Saxkjøbing"},
      {image_url: "/6148/token-654.png", info_url: "/6148/token-654.json", is_corrected: false, string: "Sønderherred"},
      {image_url: "/6148/token-670.png", info_url: "/6148/token-670.json", is_corrected: false, string: "Høgsmarke."},
      {image_url: "/6148/token-688.png", info_url: "/6148/token-688.json", is_corrected: false, string: "Arre­"},
      {image_url: "/6148/token-689.png", info_url: "/6148/token-689.json", is_corrected: false, string: "stanten"},
      {image_url: "/6148/token-694.png", info_url: "/6148/token-694.json", is_corrected: false, string: "Lindebjerg"},
      {image_url: "/6148/token-710.png", info_url: "/6148/token-710.json", is_corrected: false, string: "Jurisdiktionerne"},
      {image_url: "/6148/token-713.png", info_url: "/6148/token-713.json", is_corrected: false, string: "0)"},
      {image_url: "/6148/token-716.png", info_url: "/6148/token-716.json", is_corrected: false, string: "Nørvang-TørrUd"},
      {image_url: "/6148/token-721.png", info_url: "/6148/token-721.json", is_corrected: false, string: "Teinløv"},
      {image_url: "/6148/token-724.png", info_url: "/6148/token-724.json", is_corrected: false, string: "skalk"},
      {image_url: "/6148/token-725.png", info_url: "/6148/token-725.json", is_corrected: false, string: "JUrgensen,"},
      {image_url: "/6148/token-728.png", info_url: "/6148/token-728.json", is_corrected: false, string: "Hylke"},
      {image_url: "/6148/token-738.png", info_url: "/6148/token-738.json", is_corrected: false, string: "eften"},
      {image_url: "/6148/token-763.png", info_url: "/6148/token-763.json", is_corrected: false, string: "Kjøbenbavn"},
      {image_url: "/6148/token-770.png", info_url: "/6148/token-770.json", is_corrected: false, string: "Kriminal-"},
      {image_url: "/6148/token-781.png", info_url: "/6148/token-781.json", is_corrected: false, string: "Jurisdik­"},
      {image_url: "/6148/token-791.png", info_url: "/6148/token-791.json", is_corrected: false, string: "1S63"},
      {image_url: "/6148/token-793.png", info_url: "/6148/token-793.json", is_corrected: false, string: "Naurs-"},
      {image_url: "/6148/token-794.png", info_url: "/6148/token-794.json", is_corrected: false, string: "dalhuse"},
      {image_url: "/6148/token-808.png", info_url: "/6148/token-808.json", is_corrected: false, string: "Løth"},
      {image_url: "/6148/token-822.png", info_url: "/6148/token-822.json", is_corrected: false, string: "Kriminal-"},
      {image_url: "/6148/token-825.png", info_url: "/6148/token-825.json", is_corrected: false, string: "6."},
      {image_url: "/6148/token-826.png", info_url: "/6148/token-826.json", is_corrected: false, string: "Krimi­"},
      {image_url: "/6148/token-837.png", info_url: "/6148/token-837.json", is_corrected: false, string: "Lursdatter,"},
      {image_url: "/6148/token-839.png", info_url: "/6148/token-839.json", is_corrected: false, string: "Fentz"},
      {image_url: "/6148/token-841.png", info_url: "/6148/token-841.json", is_corrected: false, string: "Føns,"},
      {image_url: "/6148/token-846.png", info_url: "/6148/token-846.json", is_corrected: false, string: "Langsted"},
      {image_url: "/6148/token-890.png", info_url: "/6148/token-890.json", is_corrected: false, string: "Wichert,"},
    ]
    this.getNextTokenFromList();

    /*this.route.paramMap.subscribe(async params => {
      this.ApiService.getAllTokensFromDocId(params.get("docid")).toPromise().then((data: Array<object>) => {
        this.tokenList = data;

        console.log("tokenList loaded");
        let corrected: Array<Object> = new Array;
        let uncorrected: Array<object> = new Array;
        this.tokenList.map((token) => {
          if(token['is_corrected']) {
            corrected.push(token);
          } else {
            uncorrected.push(token);
          }
        })

        this.correctedList = corrected;
        this.uncorrectedList = uncorrected;

        console.log("total num:", this.tokenList.length);
        console.log("corrected:", this.correctedList.length);
        console.log("uncorrected:", this.uncorrectedList.length);

      })
    })*/
  }

  public getNextTokenFromList() {
    this.ApiService.getTokenFromInfoUrl(this.uncorrectedList[this.index]['info_url']).subscribe((data: JSON) => {
      this.mainToken = new Token(data);
    })
    this.index++;
  }
}
