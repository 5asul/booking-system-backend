import { AdminService } from "../services/implementation/adminService";
import { prismaMock } from '../config/prismaMock';


describe('AdminService', () => {
  test('should update doctor status', async () => {
    // Mock an admin user
    prismaMock.user.findFirst.mockResolvedValue({
      id: 1,
      role: 'ADMIN',
    } as any);

    prismaMock.user.findFirst.mockResolvedValue({
      id: 3,
      
    }as any) ;

    // Mock the doctor update
    prismaMock.user.update.mockResolvedValue({
      id: 3,
      status: false,
    } as any);

    const result = await AdminService.updateDoctorStatus(3, false, 1);
    expect(result.status).toBe(false);
  });

  test('should throw an error if unauthorized', async () => {
    // Mock unauthorized admin
    prismaMock.user.findFirst.mockResolvedValue(null);

    await expect(AdminService.updateDoctorStatus(2, true, 1)).rejects.toThrow(
      'You are not Authorized'
    );
  });
});
