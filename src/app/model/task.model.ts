export class Task {
    
  constructor(
    public id: number,
    public titulo: string,
    public descricao: string,
    public status: string,
    public dtCriacao: string,
    public dtAlteracao: string

  ){}
}