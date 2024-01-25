import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
describe('AuthController', () => {
  // ...

  describe('getRole', () => {
    it('should return the role', async () => {
      // Arrange
      const token = 'testToken';
      const expectedRole = 'admin';
      jest.spyOn(controller.authService, 'getRole').mockResolvedValue(expectedRole);

      // Act
      const result = await controller.getRole(token);

      // Assert
      expect(controller.authService.getRole).toHaveBeenCalledWith(token);
      expect(result).toBe(expectedRole);
    });
  });

  // ...
});