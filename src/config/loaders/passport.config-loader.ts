import { PassportOptions } from '@arasaka-cinema/passport'
import { ConfigService } from '@nestjs/config'

import { AllConfigs } from '@/config'

export function getPassportConfig(
	configService: ConfigService<AllConfigs>
): PassportOptions {
	return {
		secretKey: configService.get('passport.secretKey', {
			infer: true
		})
	}
}
