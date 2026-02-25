import { convertEnum, RpcStatus } from '@arasaka-cinema/common'
import { Role } from '@arasaka-cinema/contracts/gen/account'
import type {
	GetAccountRequest,
	InitEmailChangeRequest
} from '@arasaka-cinema/contracts/gen/account'
import { Injectable } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'

import { AccountRepository } from '@/modules/account/account.repository'
import { OtpService } from '@/modules/otp/otp.service'
import { UserRepository } from '@/shared/repositories'

@Injectable()
export class AccountService {
	public constructor(
		private readonly accountRepository: AccountRepository,
		private readonly userRepository: UserRepository,
		private readonly otpService: OtpService
	) {}

	public async getAccount(data: GetAccountRequest) {
		const { id } = data

		const account = await this.accountRepository.findById(id)

		if (!account)
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				message: 'Account not found'
			})

		return {
			id: account.id,
			role: convertEnum(Role, account.role),
			phone: account.phone,
			email: account.email,
			isPhoneVerified: account.isPhoneVerified,
			isEmailVerified: account.isEmailVerified
		}
	}

	public async initEmailChange(data: InitEmailChangeRequest) {
		const { email, userId } = data

		const existing = await this.userRepository.findByEmail(email)

		if (existing)
			throw new RpcException({
				code: RpcStatus.ALREADY_EXISTS,
				message: 'Email already in use'
			})

		const code = await this.otpService.send(email, 'email')
	}
}
