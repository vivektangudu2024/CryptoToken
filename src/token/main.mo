import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";

actor Token{

    var owner : Principal= Principal.fromText("cdzw4-ddkfs-2jqux-l6tou-qeiay-r7ttp-yarzi-zrewb-kyucb-loxkf-kae");
    var totalSupply : Nat = 1000000000;
    var symbol: Text = "MSV";
    private stable var balanceEntries :[(Principal,Nat)]=[];
    private var balances=HashMap.HashMap<Principal,Nat>(1,Principal.equal,Principal.hash);
    if(balances.size() < 1){
            balances.put(owner,totalSupply);

        };
    
    public query func balanceOf(who: Principal): async Nat{

        let balance :Nat =switch (balances.get(who)){
            case null 0;
            case (?result) result;
        };
        return balance
    };

    public query func getSymbol():async Text{
        return symbol;
    };

    public shared(msg) func payOut(): async Text{
        //Debug.print(debug_show(msg.caller));
        if(balances.get(msg.caller) == null){
        let amount=10000;
        let result =await  transfer(msg.caller,amount);
        return result;
        };
        return "Insufficient";
    };

    public shared(msg) func transfer(to : Principal,amount : Nat): async Text {
        let fromBalance : Nat = await balanceOf(msg.caller);
        if(fromBalance > amount){
            let newFromBalance :Nat = fromBalance-amount;
            balances.put(msg.caller,newFromBalance);
            let toBalance = await balanceOf(to);
            let newtoBalance = toBalance+amount;
            balances.put(to,newtoBalance);
            return "Success";
        };
        return "Insufficient Funds";
    };

    system func preupgrade(){
        balanceEntries:=Iter.toArray(balances.entries());
    };

    system func postupgrade(){
        balances:= HashMap.fromIter<Principal,Nat>(balanceEntries.vals(),1,Principal.equal,Principal.hash);
        if(balances.size() < 1){
            balances.put(owner,totalSupply);

        };
    };
};