import { registerAs } from '@nestjs/config'

import type { PassportConfig } from '@/config/interfaces/passport.interface'
import { PassportValidator } from '@/config/validators'
import { validateEnv } from '@/shared/utils'

export const passportEnv = registerAs<PassportConfig>('passport', () => {
	validateEnv(process.env, PassportValidator)

	return {
		secretKey: process.env.PASSPORT_SECRET_KEY,
		accessTtl: parseInt(process.env.PASSPORT_ACCESS_TTL),
		refreshTtl: parseInt(process.env.PASSPORT_REFRESH_TTL)
	}
})
