package engageapidocs

import (
	"testing"

	"github.com/grokify/swaggman/openapi3"
)

var specTests = []struct {
	filepath string
	title    string
}{
	{"ringcentral_openapi3.json", "RingCentral Connect Platform API"},
}

// TestSpecs test reading specs.
func TestSpecs(t *testing.T) {
	for _, tt := range specTests {
		spec, err := openapi3.ReadAndValidateFile(tt.filepath)
		if err != nil {
			t.Errorf("openapi3.ReadAndValidateFile('%s') Error [%s]", tt.filepath, err.Error())
		} else if tt.title != spec.Info.Title {
			t.Errorf("openapi3.ReadAndValidateFile('%s') Want [%s] Got [%s]", tt.filepath, tt.title, spec.Info.Title)
		} else {
			specmore := openapi3.SpecMore{Spec: spec}
			t.Logf("SPEC_IS_VALID [%s] TITLE [%s] OP_COUNT [%d]\n",
				tt.filepath, spec.Info.Title, specmore.OperationsCount(),
			)
		}
	}
}
