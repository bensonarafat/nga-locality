import {type Lga} from './lga';
import {type Town} from './town';
import {type Politics} from './politics';

export interface State{ 
    _id: string,
    name: string 
    state_code: string, 
    capital: string, 
    location: { latitude: string, longitude: string },
    population: string, 
    total_area: string,  
    postal_code: string,
    creation_date: string,
    lgas: Array<Lga>, 
    towns: Array<Town>, 
    religions: Array<string>, 
    ethnic_groups: Array<string>,
    languages: Array<string>,
    politics: Politics, 
    national_resources: Array<string>,
    bordering_states: Array<string>,
    universities: Array<string>, 
    polytechnics: Array<string>,
    airports: Array<string>,
    hospitals: Array<string>
}