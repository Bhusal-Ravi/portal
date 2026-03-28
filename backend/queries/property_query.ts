export const offsetPropertyQuery = `select p.id,p.name,p.location,p.image_url,p.created_at,u.name as username,
                                        case when exists (
                                                select 1 from favourite
                                                where property_id=p.id and user_id=$3
                                                )
                                                then true
                                                else false
                                                end as favourite
                                     from properties p join users u
                                     on p.user_id=u.id
                                    order by created_at desc, id desc
                                    limit $1 offset $2`


export const checkPropertyOwner= `select user_id from properties 
                                  where id=$1`


export const insertIntoFavourite= `insert into favourite (user_id,property_id)
                                    values 
                                    ($1,$2)`   
                                    
export const deleteFromFavourite= `delete from favourite
                                   where user_id=$1 and property_id=$2`


export const listuserProperty= `select * from properties 
                                where user_id=$1
                                limit $2 offset $3`

export const listuserFavourite= `select p.id,p.user_id,p.name,p.location,p.image_url,p.created_at, u.name as username,
                                true as favourite from
                                properties p join users u on u.id= p.user_id
                                join favourite f on p.id=f.property_id  
                                where f.user_id=$1
                                order by p.created_at desc, p.id desc
                                limit $2 offset $3`

export const deleteProperty= `delete from properties where
                                id=$1 and user_id=$2
                                `


export const insertProperty= `INSERT INTO properties (user_id, name, location, image_url)
                              VALUES ($1,$2,$3,$4)`