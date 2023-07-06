import Datastore from 'nedb';
import { Audit } from "../model/audit";

export class AuditDatabase {

    private auditsDB: Datastore;


    constructor() {
        this.auditsDB = new Datastore({
            filename: './db/audits.db',
            autoload: true
        });
    }

    save(audit: Audit): Promise<Audit> {
        return new Promise((resolve, reject) => {
            this.auditsDB.insert(audit, (err, aduitObj) => {
                if(err){
                    reject(err);
                } else {
                    resolve(aduitObj);
                }
            });
        });
    }



      
}