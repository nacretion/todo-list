import User from "../Utils/User"
import {Request, Response} from "express";

export class UserController {
    async createUser(request: Request, result: Response) {
        try {
            let {login, password, first_name, last_name, second_name} = request.body

            if (login && password && first_name && last_name && second_name) {
                login = login.toLowerCase()
                first_name = first_name.toLowerCase()
                last_name = last_name.toLowerCase()
                second_name = second_name.toLowerCase()
                const user = await User.create(login, password, first_name, last_name, second_name)


                if (user) {
                    const token = await User.createToken(user)
                    if (token) {

                        return result.status(201).json({user, token: token})
                    }
                    return result.status(500).json({message: "Authentication error error"})
                }

                return result.status(409).json({message: "Already exists"})

            }

            result.status(400).json({message: "Blank fields"})
        } catch (e: any) {
            result.status(500).json({message: "Something went wrong. Try again"})
        }
    }

    async authUser(request: Request, result: Response) {
        try {
            let {login, password} = request.body

            if (login && password) {
                login = login.toLowerCase()
                const user = await User.authenticateUser(login, password)

                if (user === 404) {

                    return result.status(404).json({message: "user not exists"})
                }
                if (user === 401) {

                    return result.status(404).json({message: "password incorrect"})
                }

                if (user === 500) {

                    return result.status(404).json({message: "Authentication error"})
                }

                if (user) {
                    return result.status(201).json(user)
                }
            }

            result.status(400).json({message: "Blank fields"})
        } catch (e: any) {
            result.status(500).json({message: "Something went wrong. Try again"})
        }
    }

    async getAll(request: Request, result: Response) {
        try {
            const users = await User.getAll()
            if (users) {
                result.status(200).json(users)
            } else {
                result.status(404).json("not found")
            }
        } catch (e) {
            result.status(500).json({message: "Something went wrong. Try again"})
        }
    }

    async getAbbreviatedNameById(request: Request, result: Response) {
        try {
            let {id} = request.query as { id: string }

            if (id) {

                const name = await User.getAbbreviatedNameById(parseInt(id))

                result.status(200).json({name})
            }


            // result.status(400).json({message: "Blank fields"})
        } catch (e: any) {
            result.status(500).json({message: "Something went wrong. Try again"})
        }
    }

    async verifyToken(request: Request, result: Response) {
        try {
            const token = request.headers.authorization
            if (token) {
                const isValid = await User.verifyToken(token)
                return isValid ?
                     result.status(200).json("ok")
                    : result.status(400).json("false")

            }

        } catch (e) {
            result.status(500).json({message: "Something went wrong. Try again"})
        }
    }
}
