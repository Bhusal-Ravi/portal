export const offsetPropertyQuery = `select p.id,p.name,p.location,p.image_url,p.created_at,u.name as username,
                                        case when exists (
                                                select 1 from favourite
                                                where property_id=p.id and user_id=u.id
                                                )
                                                then true
                                                else false
                                                end as favourite
                                     from properties p join users u
                                     on p.user_id=u.id
                                    order by created_at desc, id desc
                                    limit $1 offset $2`