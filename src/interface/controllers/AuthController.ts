import { validate } from "class-validator";
import { Request, Response } from "express";
import { DIContainer } from "../../infrastructure/DIContainer";
import { SignUpUserDto } from "../dto/SignUpUserDto";
import { SignInUserDto } from "../dto/SignInUserDto";

export class AuthController {
  private signUpUser = DIContainer.getSignUpUserUseCase();
  // private signInUser = DIContainer.getSignInUserUseCase();

  async signUp(req: Request, res: Response): Promise<any> {
    const dto = Object.assign(new SignUpUserDto(), req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      return res.status(422).json({ errors });
    }

    const user = await this.signUpUser.execute(dto, res);
    return res.status(201).json(user);
  }

  // async signin(req: Request, res: Response): Promise<any> {
  //   const dto = Object.assign(new SignInUserDto(), req.body);
  //   const errors = await validate(dto);

  //   if (errors.length > 0) {
  //     return res.status(400).json({ errors });
  //   }

  //   const token = await this.signInUser.execute(dto);
  //   return res.status(200).json({ token });
  // }
}
