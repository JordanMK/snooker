
class Seizoen{
    startDatum:Date;
    eindDatum:Date;
    speeldagen: Speeldag[];
    users: User[];
    seizoenKlassenment: SeizoenKlassenment;
    frozenSeizoenKlassenment: SeizoenKlassenment;
    frozen: Boolean = false;
    
    constructor(){
        this.startDatum = null;
        this.eindDatum = null;
        this.speeldagen = [];
        this.users = [];
        this.seizoenKlassenment = null;
        this.frozenSeizoenKlassenment = null;
        this.frozen = false;
    }
}

class Speeldag {
    wedstrijden:Wedstrijd[]
    speeldagKlassement:SpeeldagKlassement;
    schiftingsvraag:string
    schiftingsAntwoord:string
    constructor(){
        this.wedstrijden = [];
        this.schiftingsvraag = null;
        this.schiftingsAntwoord = null;
    }
}

enum Resultaat {
    Thuis = "1",
    Draw = "X",
    Uit = "2"
}

class Wedstrijd {
    thuisploeg:string;
    uitploeg:string;
    resultaat:Resultaat;
    stemVoor:Date;
    constructor(thuisploeg:string,uitploeg:string,stemVoor:Date){
        this.thuisploeg = thuisploeg;
        this.uitploeg = uitploeg;
        this.resultaat = null;
    }
}

class User {
    uid:string;
    votedSpeeldagen:VotedSpeeldag[];
    naam:string;
    betaald:boolean;
    admin:boolean;
    constructor(){
        
    }
    canUseJoker() {
        
    }
}

class VotedSpeeldag {
    votedWedstrijden: VotedWedstrijd[]
}

class VotedWedstrijd {
    wedstrijd: Wedstrijd;
    keuze: Resultaat;
}

class SeizoenKlassenment {
    
    constructor(){
        
    }
}

class SpeeldagKlassement {
    
    constructor(){
        
    }
}

interface Match {
    _id: string;
    wedstrijdVotes: any[]; // Assuming the type of wedstrijdVotes is an array of any data type
    datum: Date;
    resultaat: string;
    thuis: string;
    uit: string;
    __v: number;
}