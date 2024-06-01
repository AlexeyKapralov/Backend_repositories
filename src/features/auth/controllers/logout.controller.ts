import {Request, Response} from "express";
import {loginService} from "../service/login.service";
import {ResultStatus} from "../../../common/types/resultStatus.type";
import {StatusCodes} from "http-status-codes";
import {jwtService} from "../../../common/adapters/jwt.service";

export const logoutController = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken

    const tokenPayload = jwtService.verifyAndDecodeToken(refreshToken)

    const result = await loginService.logout(tokenPayload!.deviceId, tokenPayload!.userId, tokenPayload!.iat)

    if (result.status === ResultStatus.Success) {
        res.status(StatusCodes.NO_CONTENT).json()
    }
    if (result.status === ResultStatus.BadRequest) {
        res.status(StatusCodes.UNAUTHORIZED).json()
    }
    if (result.status === ResultStatus.Unauthorized) {
        res.status(StatusCodes.UNAUTHORIZED).json(result.errorMessage)
    }
}