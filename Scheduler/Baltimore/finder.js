const axios = require('axios');
const cheerio = require('cheerio');

class Baltimore {
    constructor(){
        this.civil_rights_url ='https://civilrights.baltimorecity.gov/meetings-2';
    }

    async getCivilRightsPage(){
        try{
            const request = await axios.get(this.civil_rights_url);
            const body = request.data;

            const $ = cheerio.load(body);
            const date_list = [];
            const href_list = [];
            $('.field-name-body p strong').each(function(){
                date_list.push($(this).html());
            });
            $('.field-name-body p a').each(function(){
                href_list.push($(this).attr('href'));
            });
            const detail_array = date_list.map((date, index)=>{
                const split_date = date.split('at');
                date = split_date[0].replace('&nbsp;', '');
                const time_part = split_date[1];
                let time;
                if(time_part){
                    if(time_part.includes('am')){
                        time = parseInt(time_part.replace(/\D/g,''))
                    } else if(time_part.includes('pm')){
                        const time_string_length = time_part.replace(/\D/g,'').length
                        if( time_string_length == 2 ){
                            time = parseInt(time_part.replace(/\D/g,'')) + 12
                        } else if (time_string_length == 4 ){
                            time = parseInt(time_part.replace(/\D/g,'')) + 1200;
                        } else if (time_string_length == 1){
                            time = parseInt(time_part.replace(/\D/g,'') + '00') + 1200;
                        }

                    }
                    const info_object = {
                        date,
                        time,
                        index:index,
                        href: href_list[index],
                        department: 'Department of Equity and Civil Rights',
                        description: 'Administrative charging committee meeting. Details here: https://civilrights.baltimorecity.gov/administrative-charging-committee'
                    }
                    return info_object;
                }

                
            })

            const filtered_details = detail_array.filter(info_object=>{
                if(info_object){
                    const info_date = new Date(info_object.date);
                    const now = new Date();
                    if(info_date > now){
                        return info_object
                    }
                }
                
            })
            return filtered_details;
        } catch(e){
            console.log(e)
            return e;
        }

    }
}

const bmore = new Baltimore()
bmore.getCivilRightsPage()