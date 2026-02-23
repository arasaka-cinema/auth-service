import { convertEnum, RpcStatus } from '@arasaka-cinema/common'
import { Role } from '@arasaka-cinema/contracts/gen/account'
import type { GetAccountRequest } from '@arasaka-cinema/contracts/gen/account'
import { Injectable } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'

import { AccountRepository } from '@/modules/account/account.repository'

@Injectable()
export class AccountService {
	public constructor(private readonly accountRepository: AccountRepository) {}

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
}
