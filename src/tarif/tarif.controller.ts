import { Controller } from '@nestjs/common';
import { TarifService } from './tarif.service';

@Controller('tarif')
export class TarifController {
  constructor(private readonly tarifService: TarifService) {}
}
