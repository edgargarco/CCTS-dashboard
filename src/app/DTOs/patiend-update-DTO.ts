export class PatientUpdateDTO {
  constructor(
    public id: string,
    public status: boolean,
    public fever: boolean,
    public cough: boolean,
    public breathDifficulty: boolean,
    public soreThroat: boolean,
    public smellLoss: boolean,
    public tasteLoss: boolean
  ) {}
}
