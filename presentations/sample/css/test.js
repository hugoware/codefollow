describe('`dl` element', function() {
  it('should have `.profile` set for the class', function() { expect( __is_profile_set ).toBe( true ); });
});

describe('profile `img` tag', function() {
  it('should have `70px` height', function() { expect( __image_height_set_correctly ).toBe( true ); });
  it('should have `70px` width', function() { expect( __image_width_set_correctly ).toBe( true ); });
  it('not affect all images', function() { expect( __all_images_resized ).toBe( false ); });
});

describe('profile `dt` and `dd` tag', function() {
  it('should be floated left', function() { expect( __is_dt_floated ).toBe( true ); });
  it('limited to .profile', function() { expect( __is_dt_selected_for_profile ).toBe( true ); });
});

describe('profile `h3` tag', function() {
  it('should have 32px font size', function() { expect( __is_h3_size_set ).toBe( true ); });
  it('limited to .profile', function() { expect( __is_h3_selected_for_profile ).toBe( true ); });
});

describe('profile `p` tag', function() {
  it('should have 16px font size', function() { expect( __is_p_size_set ).toBe( true ); });
  it('and set to `italic` ', function() { expect( __is_p_is_italic ).toBe( true ); });
  it('limited to .profile', function() { expect( __is_p_selected_for_profile ).toBe( true ); });
});