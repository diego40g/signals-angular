import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Hydrate REST demo')
@Controller('hydrate-rest')
export class HydrateRestController {
    @Get()
    @ApiOperation({ summary: 'Get hydrate REST endpoint demo' })
    @ApiResponse({ status: 200, description: 'Returns a demo message' })
    getHydrateRestDemo(): string {
        return 'Hydrate REST endpoint demo';
    }
}
