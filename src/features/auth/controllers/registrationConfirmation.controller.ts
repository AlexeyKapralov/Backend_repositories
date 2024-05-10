import { Request, Response } from 'express'
import { IRegistrationConfirmationCodeModel } from '../models/registrationConfirmationCode.model'
import { loginService } from '../../../service/login.service'
import { ResultStatus } from '../../../common/types/resultStatus.type'
import { StatusCodes } from 'http-status-codes'

export const registrationConfirmationController = async (req: Request<{},{},IRegistrationConfirmationCodeModel>, res:Response) => {
	const result = await loginService.confirmationCode(req.body.code)
	result.status === ResultStatus.Success
		? res.status(StatusCodes.NO_CONTENT).json()
		: res.status(StatusCodes.NOT_FOUND).json()
}