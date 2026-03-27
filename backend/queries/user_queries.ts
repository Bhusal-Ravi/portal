

export const  createUser= `insert into users (name,email,password_hash)
                    values
                    ($1,$2,$3)
                    returning id,name,email
                    `

export const checkUser= `select * from users 
                         where email=$1   `