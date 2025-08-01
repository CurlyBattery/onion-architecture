export interface IRepository<
  T,
  WhereInput,
  WhereUniqueInput,
  Select,
  Include,
  CreateInput,
  UpdateInput,
> {
  get(params: {
    where: WhereUniqueInput;
    select?: Select;
    include?: Include;
  }): Promise<T>;
  delete(params: { where: WhereUniqueInput }): Promise<void>;
  save(params: {
    data: CreateInput;
    select?: Select;
    include?: Include;
  }): Promise<T>;
  update(params: {
    where: WhereUniqueInput;
    data: UpdateInput;
    select?: Select;
    include?: Include;
  }): Promise<T>;
  getAll(params: {
    where?: WhereInput;
    select?: Select;
    include?: Include;
    take?: number;
  }): Promise<T[]>;
}
