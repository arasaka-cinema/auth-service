import { Injectable } from '@nestjs/common'
import { Account } from '@prisma/generated/client'
import {
	AccountCreateInput,
	AccountUpdateInput
} from '@prisma/generated/models/Account'

import { PrismaService } from '@/infrastructure/prisma/prisma.service'

@Injectable()
export class AuthRepository {
	public constructor(private readonly prismaService: PrismaService) {}

	public async create(data: AccountCreateInput): Promise<Account> {
		return await this.prismaService.account.create({
			data
		})
	}

	public async update(
		id: string,
		data: AccountUpdateInput
	): Promise<Account> {
		return await this.prismaService.account.update({
			where: {
				id
			},
			data
		})
	}
}
