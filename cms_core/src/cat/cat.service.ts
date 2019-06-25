// @Injectable()
// export class CatService extends CrudService(CatEntity) implements ICrudService {
//   async getCatsByName(inner_name: string): Promise<any> {
//     if (inner_name) {
//       try {
//         const foundCats = await this.getRepository().find({
//           where: {
//             name: inner_name,
//           },
//         });
//       } catch (e) {
//         throw new BadRequestException(e.message);
//       }
//     } else {
//       throw new BadRequestException(`Uncorrect param name=${inner_name}`);
//     }
//   }
// }
