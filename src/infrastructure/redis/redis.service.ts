import {
	Injectable,
	Logger,
	type OnModuleDestroy,
	type OnModuleInit
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Redis from 'ioredis'

import type { AllConfigs } from '@/config'

@Injectable()
export class RedisService
	extends Redis
	implements OnModuleInit, OnModuleDestroy
{
	private readonly logger = new Logger(RedisService.name)

	public constructor(
		private readonly configService: ConfigService<AllConfigs>
	) {
		super({
			username: configService.get('redis.user', { infer: true }),
			password: configService.get('redis.password', { infer: true }),
			host: configService.get('redis.host', { infer: true }),
			port: configService.get('redis.port', { infer: true }),
			maxRetriesPerRequest: 5,
			enableOfflineQueue: true
		})
	}

	public async onModuleInit(): Promise<void> {
		const start = new Date()
		this.logger.log('Initializing redis...')

		this.on('connect', () => {
			this.logger.log(`Redis connecting...`)
		})

		this.on('ready', () => {
			this.logger.log(
				`Redis connected (time=${new Date().getTime() - start.getTime()}ms)`
			)
		})

		this.on('error', error => {
			this.logger.error('Redis error:', {
				error: error.message ?? error
			})
		})

		this.on('close', () => {
			this.logger.warn('Redis connection closed')
		})

		this.on('reconnecting', () => {
			this.logger.log('Redis reconnecting...')
		})
	}

	public async onModuleDestroy(): Promise<void> {
		this.logger.log('closing Redis connection...')

		try {
			await this.quit()

			this.logger.log('Redis connection closed')
		} catch (error) {
			this.logger.error('Error closing Redis connection', error)
		}
	}
}
