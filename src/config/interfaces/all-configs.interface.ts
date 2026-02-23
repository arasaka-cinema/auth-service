import type { DatabaseConfig } from '@/config/interfaces/database.interface'
import type { GrpcConfig } from '@/config/interfaces/grpc.interface'
import type { PassportConfig } from '@/config/interfaces/passport.interface'
import type { RedisConfig } from '@/config/interfaces/redis.interface'

export interface AllConfigs {
	database: DatabaseConfig
	grpc: GrpcConfig
	passport: PassportConfig
	redis: RedisConfig
}
